/**
 * First-visit intro handshake.
 *
 * The inline script in app/layout.tsx marks <html data-intro="play"> before
 * the first paint when this tab hasn't seen the loader yet. PageLoader plays
 * its curtain and calls finishIntro(); anything that should wait for the
 * curtain (the hero's entrance) subscribes with onIntroDone().
 */

export const INTRO_SEEN_KEY = "nk-intro-seen";
const DONE_EVENT = "nk:intro-done";

export function introPending(): boolean {
    return typeof document !== "undefined" && document.documentElement.dataset.intro === "play";
}

/** Runs `cb` once the intro is out of the way (right away if there is none). */
export function onIntroDone(cb: () => void): () => void {
    if (!introPending()) {
        cb();
        return () => {};
    }
    window.addEventListener(DONE_EVENT, cb, { once: true });
    return () => window.removeEventListener(DONE_EVENT, cb);
}

export function finishIntro(): void {
    delete document.documentElement.dataset.intro;
    try {
        sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
        // private mode: the loader simply plays again next time
    }
    window.dispatchEvent(new Event(DONE_EVENT));
}

/**
 * Runs before paint (inlined in <head>): restores the theme and decides
 * whether this visit gets the loader. Kept tiny and dependency-free.
 */
export const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');d.setAttribute('data-theme',t==='dark'?'dark':'light');if(window.matchMedia('(hover: hover) and (pointer: fine)').matches)d.classList.add('glass-scrollbar');var calm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(!calm&&!sessionStorage.getItem('${INTRO_SEEN_KEY}'))d.setAttribute('data-intro','play');}catch(e){}})();`;
