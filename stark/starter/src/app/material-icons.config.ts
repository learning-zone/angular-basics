import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

/**
 * Registers the @mdi svg icon set to the Angular Material icon registry in the default namespace
 * @param matIconRegistry - Angular Material's icon registry
 * @param domSanitizer - Angular's DOM sanitizer
 */
export function registerMaterialIconSet(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer): void {
	// IMPORTANT: the path of the @mdi svg icon set should match the output path given to it in the angular.json file
	const iconSetUrl: string = "assets/material-icons/mdi.svg";

	matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl(iconSetUrl));
}
