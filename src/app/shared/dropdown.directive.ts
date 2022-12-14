import { Directive, ElementRef, HostBinding, HostListener, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {

    @HostBinding('class.open') isOpen = false;

    constructor(private elRef: ElementRef) { }

    /* @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
    } */

    /* Opening anywhere in DOM hides the dropdown */
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }
}