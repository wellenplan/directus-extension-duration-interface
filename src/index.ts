import { defineInterface } from "@directus/extensions-sdk";
import InterfaceComponent from "./interface.vue";

export default defineInterface({
  id: "duration",
  name: "$:duration.interface.name",
  description: "$:duration.interface.description",
  icon: "timer",
  component: InterfaceComponent,
  options: [
    {
      field: "min",
      name: "$t:interfaces.input.minimum_value",
      type: "integer",
      meta: {
        width: "half",
        interface: "input",
      },
    },
    {
      field: "max",
      name: "$t:interfaces.input.maximum_value",
      type: "integer",
      meta: {
        width: "half",
        interface: "input",
      },
    },
    {
      field: "step",
      name: "$t:interfaces.input.step_interval",
      type: "integer",
      meta: {
        width: "half",
        interface: "input",
      },
      schema: {
        default_value: 1,
      },
    },
    {
      field: "placeholder",
      name: "$t:placeholder",
      type: "string",
      meta: {
        width: "half",
        interface: "system-input-translated-string",
        options: {
          placeholder: "$t:enter_a_placeholder",
        },
      },
    },
    {
      field: "font",
      name: "$t:font",
      type: "string",
      meta: {
        width: "half",
        interface: "select-dropdown",
        options: {
          choices: [
            { text: "$t:sans_serif", value: "sans-serif" },
            { text: "$t:monospace", value: "monospace" },
            { text: "$t:serif", value: "serif" },
          ],
        },
      },
      schema: {
        default_value: "sans-serif",
      },
    },
  ],
  types: ["integer", "float", "decimal"],
});
