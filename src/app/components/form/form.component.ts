import { Component } from '@angular/core';
import { createWidget } from "@typeform/embed";
import "@typeform/embed/build/css/widget.css"; //import widget css

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  ngOnInit(): void {
    // make sure #form element exists in template
    const container = document.querySelector("#form") as HTMLElement; // Ensure container is of type HTMLElement
    if (container) {
      createWidget("aTEW5zeJ", { container });
    }
  }

}
