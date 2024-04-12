import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-combobox',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './combobox.component.html',
  styleUrl: './combobox.component.scss',
})
export class ComboboxComponent {
  private _options: Array<{ id: number; label: string }> = [
    { id: 0, label: 'Select option...' },
  ];
  @Input()
  get options(): Array<{ id: number; label: string }> {
    return this._options;
  }
  set options(value: Array<{ id: number; label: string }>) {
    if (value) this._options = [...this._options, ...value];    
  }

  private _default: { id: number; label: string } | undefined;
  @Input()
  set default(value: { id: number; label: string } | undefined) {
    this._default = value;
    if (this._default) {
      this.selectedOption = this._default;
    }
  }

  selectedOption:  { id: number; label: string } = this.options[0];
  @Output() onChange = new EventEmitter<{ id: number; label: string }>();

  onSelect(): void {
    this.onChange.emit(this.selectedOption);
  }
}
