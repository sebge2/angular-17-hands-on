import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";

@Component({
    selector: 'app-multi-select-dropdown',
    standalone: true,
    imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
    templateUrl: './multi-select-dropdown.component.html',
    styleUrl: './multi-select-dropdown.component.scss'
})
export class MultiSelectDropdownComponent<E> {

    @Input({required: true})
    placeHolder: string = '';

    @Input({required: true})
    itemLabelExtractor = (_: E) => '';

    @Output()
    readonly selectedChange: EventEmitter<E[]> = new EventEmitter<E[]>();

    private _availableValues: E[] = [];
    private _selected: E[] = [];

    constructor() {
    }

    @Input()
    get availableValues(): E[] {
        return this._availableValues;
    }

    set availableValues(value: E[]) {
        this._availableValues = value || [];
        this.selected = this.availableValues;
    }

    @Input()
    get selected(): E[] {
        return this._selected;
    }

    set selected(value: E[]) {
        this._selected = value || [];

        this.selectedChange.emit(this.selected);
    }
}
