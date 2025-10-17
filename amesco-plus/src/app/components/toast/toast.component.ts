import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-toast',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
    @Input() message = '';
    @Input() duration = 4500;
    // callback provided by the service so the component can request destruction
    onClose?: () => void;

    private hideTimeout: any;

    ngOnInit(): void {
        // start auto-hide timer
        this.hideTimeout = setTimeout(() => this.close(), this.duration);
    }

    close() {
        if (this.hideTimeout) clearTimeout(this.hideTimeout);
        // animate out by adding a class, then call onClose after animation
        const el = (document.querySelector('app-toast') as HTMLElement) || null;
        if (el) el.classList.add('toast--hide');
        setTimeout(() => {
            try { this.onClose && this.onClose(); } catch { }
        }, 260);
    }
}
