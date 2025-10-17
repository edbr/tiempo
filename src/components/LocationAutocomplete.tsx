"use client";

/// <reference types="@types/google.maps" />

import { useEffect, useRef } from "react";

type Props = {
  onSelect: (place: google.maps.places.PlaceResult) => void;
};

export function LocationAutocomplete({ onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function init() {
      // Load the Maps JS API dynamically
      const { Loader } = await import("@googlemaps/js-api-loader");
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
        libraries: ["places"],
      });

      await loader.load();

      // Dynamically import the new Places library
      const { PlaceAutocompleteElement } = (await google.maps.importLibrary(
        "places"
      )) as any;

      // Create the autocomplete element
      const autocomplete = new PlaceAutocompleteElement({
        placeholder: "Enter a location",
        componentRestrictions: { country: ["us"] }, // optional
      });

      // Listen for place changes
      autocomplete.addEventListener("gmp-placechange", (e: any) => {
        const place = e?.detail?.place;
        if (place) onSelect(place);
      });

      // Mount the element into our container div
      if (containerRef.current) {
        containerRef.current.innerHTML = ""; // clear old instance if any
        containerRef.current.appendChild(autocomplete);
      }
    }

    init();
  }, [onSelect]);

  return <div ref={containerRef} className="w-full" />;
}
