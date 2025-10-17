import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
    // DOM-based toast notification 
    // implemented this instead of the usual toast i was using before in flutter/dart since im testing the app in browser
    show(message: string, duration = 4500) {
        if (typeof window === 'undefined' || typeof document === 'undefined' || !document.body) return;

        // load the template from assets (browser only)
        const assetUrl = (() => {
            try {
                return new URL('/toast.html', document.baseURI).href;
            } catch (e) {
                return './assets/toast.html';
            }
        })();

        fetch(assetUrl).then(resp => {
            if (!resp.ok) throw new Error(`Failed to fetch toast template: ${resp.status}`);
            return resp.text();
        }).then(html => {
            try {
                const processed = html.replace('__TOAST_MESSAGE__', this.escapeHtml(message));
                const container = document.createElement('div');
                container.className = 'toast-wrapper';
                container.setAttribute('role', 'status');
                container.setAttribute('aria-live', 'polite');
                container.style.position = 'fixed';
                container.style.left = '16px';
                container.style.right = '16px';
                container.style.bottom = 'calc(env(safe-area-inset-bottom, 16px) + 12px)';
                container.style.zIndex = '2147483647';
                container.style.display = 'flex';
                container.style.justifyContent = 'center';
                container.style.pointerEvents = 'auto';
                container.style.opacity = '0';
                container.style.transition = 'opacity 240ms cubic-bezier(.2,.9,.2,1), transform 240ms cubic-bezier(.2,.9,.2,1)';
                container.style.transform = 'translateY(10px)';

                container.innerHTML = processed;
                document.body.appendChild(container);

                const toastEl = container.querySelector('.toast') as HTMLElement | null;
                const closeBtn = container.querySelector('.toast__close') as HTMLElement | null;

                requestAnimationFrame(() => { container.style.opacity = '1'; container.style.transform = 'translateY(0)'; });

                const hide = () => {
                    container.style.opacity = '0';
                    container.style.transform = 'translateY(8px)';
                    setTimeout(() => { try { document.body.removeChild(container); } catch (e) { } }, 260);
                };

                let hideTimeout = setTimeout(hide, duration);

                if (closeBtn) closeBtn.addEventListener('click', () => { clearTimeout(hideTimeout); hide(); });
                container.addEventListener('mouseenter', () => { clearTimeout(hideTimeout); });
                container.addEventListener('mouseleave', () => { hideTimeout = setTimeout(hide, 1800); });
            } catch (e) {
                //fallback alert
                try { alert(message); } catch { }
            }
        }).catch(() => {
            try { alert(message); } catch { }
        });
    }

    private escapeHtml(input: string) {
        return input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
}
