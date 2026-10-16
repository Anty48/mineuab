"use client";

import { useEffect, useRef, useState } from "react";
import type { PlayerAnimation, SkinViewer as Viewer } from "skinview3d";

export type SkinPose = "walk" | "run" | "wave" | "fly" | "crouch" | "idle";

/**
 * La skin del jugador en 3D (skinview3d, amb three.js). Es carrega només en aquesta pàgina i quan es veu.
 * Es pot girar arrossegant; sola, camina i dona voltes (si el sistema no demana menys moviment).
 */
export default function SkinViewer({
  skin,
  slim,
  cape,
  pose,
  label,
  onError,
}: {
  skin: string;
  slim: boolean;
  cape?: string;
  pose: SkinPose;
  /** Text per als lectors de pantalla. */
  label: string;
  onError: () => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const modRef = useRef<typeof import("skinview3d") | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    // Un canvas nou cada vegada: dispose() perd el context WebGL del canvas, i no es podria tornar a fer servir.
    const canvas = document.createElement("canvas");
    canvas.setAttribute("role", "img");
    canvas.setAttribute("aria-label", label);
    canvas.className =
      "absolute inset-0 h-full w-full cursor-grab touch-pan-y transition-opacity duration-500 active:cursor-grabbing";
    wrap.prepend(canvas);
    let disposed = false;
    let viewer: Viewer | null = null;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = new ResizeObserver(() => {
      if (viewer) viewer.setSize(wrap.clientWidth, wrap.clientHeight);
    });
    // Fora de la pantalla no cal dibuixar-la.
    const visible = new IntersectionObserver(([entry]) => {
      if (viewer) viewer.renderPaused = !entry.isIntersecting;
    });

    import("skinview3d")
      .then(async (sv) => {
        if (disposed) return;
        modRef.current = sv;
        viewer = new sv.SkinViewer({
          canvas,
          width: wrap.clientWidth,
          height: wrap.clientHeight,
          fov: 38,
          zoom: 0.74,
        });
        viewerRef.current = viewer;
        viewer.controls.enableZoom = false;
        viewer.controls.enablePan = false;
        viewer.autoRotate = !reduceMotion;
        viewer.autoRotateSpeed = 0.55;
        viewer.playerWrapper.rotation.y = -0.45;
        viewer.animation = makeAnimation(sv, reduceMotion ? "idle" : pose);
        resize.observe(wrap);
        visible.observe(wrap);
        await viewer.loadSkin(skin, { model: slim ? "slim" : "default" });
        if (cape) await viewer.loadCape(cape).catch(() => undefined);
        if (!disposed) setReady(true);
      })
      .catch(() => {
        if (!disposed) onError();
      });

    return () => {
      disposed = true;
      resize.disconnect();
      visible.disconnect();
      viewer?.dispose();
      canvas.remove();
      viewerRef.current = null;
      setReady(false);
    };
    // La postura es canvia a part, sense tornar a crear el visor.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skin, slim, cape, label, onError]);

  useEffect(() => {
    const viewer = viewerRef.current;
    const sv = modRef.current;
    if (!viewer || !sv) return;
    viewer.animation = makeAnimation(sv, pose);
    // Per volar, la capa es converteix en èlitres (com al joc).
    if (cape) viewer.playerObject.backEquipment = pose === "fly" ? "elytra" : "cape";
  }, [pose, cape, ready]);

  return (
    <div
      ref={wrapRef}
      className={`relative h-full w-full ${ready ? "" : "[&>canvas]:opacity-0"}`}
    >
      {!ready && (
        <div aria-hidden className="absolute inset-0 grid place-items-center">
          <span className="h-10 w-10 animate-spin border-4 border-ink/15 border-t-brand-500" />
        </div>
      )}
    </div>
  );
}

function makeAnimation(sv: typeof import("skinview3d"), pose: SkinPose): PlayerAnimation {
  let animation: PlayerAnimation;
  switch (pose) {
    case "run":
      animation = new sv.RunningAnimation();
      animation.speed = 0.75;
      break;
    case "wave":
      animation = new sv.WaveAnimation("right");
      break;
    case "fly":
      animation = new sv.FlyingAnimation();
      break;
    case "crouch":
      animation = new sv.CrouchAnimation();
      animation.speed = 0.6;
      break;
    case "idle":
      animation = new sv.IdleAnimation();
      break;
    default:
      animation = new sv.WalkingAnimation();
      animation.speed = 0.6;
  }
  return animation;
}
