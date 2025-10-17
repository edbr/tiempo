// src/types/google-places.d.ts

declare namespace google.maps.places {
  /** Temporary type until @types/google.maps adds PlaceAutocompleteElement */
  class PlaceAutocompleteElement extends HTMLElement {
    disabled: boolean;
    placeholder: string;
    value: string;
    componentRestrictions?: { country: string[] };
    addEventListener(
      type: "gmp-placechange",
      listener: (event: CustomEvent<{ place: google.maps.places.PlaceResult }>) => void
    ): void;
  }
}
