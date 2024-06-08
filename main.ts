import { Plugin } from "obsidian";

const TRAFFIC_LIGHTS_OFFSET = { x: -70, y: -50 };

const hideTrafficLights = (styleTag: HTMLStyleElement) => {
	styleTag.innerText = `
      :root {
        --ewt-traffic-light-x: ${TRAFFIC_LIGHTS_OFFSET.x}px;
        --ewt-traffic-light-y: ${TRAFFIC_LIGHTS_OFFSET.y}px;
      }
    `
		.trim()
		.replace(/[\r\n\s]+/g, " ");

	window
		.require("electron")
		.remote.getCurrentWindow()
		.setTrafficLightPosition({
			x: TRAFFIC_LIGHTS_OFFSET.x,
			y: TRAFFIC_LIGHTS_OFFSET.y,
		});
};

export default class ElectronWindowTweaker extends Plugin {
	styleTag: HTMLStyleElement;

	async onload() {
		this.styleTag = document.createElement("style");
		this.styleTag.id = "ewt-styles";
		document.getElementsByTagName("head")[0].appendChild(this.styleTag);

		if (process.platform === "darwin") {
			window.addEventListener("resize", () => {
				hideTrafficLights(this.styleTag);
			});
			hideTrafficLights(this.styleTag);
		}
	}
}
