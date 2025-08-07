"use client";

import dynamic from "next/dynamic";

const NavigationEvents = dynamic(() => import("./NavigationEvents"), {
  ssr: false,
});

export default function NavigationEventsWrapper() {
  return <NavigationEvents />;
}
