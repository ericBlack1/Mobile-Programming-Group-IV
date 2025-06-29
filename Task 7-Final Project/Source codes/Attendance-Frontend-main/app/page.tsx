import { redirect } from "next/navigation"

export default function HomePage() {
  // Redirect to splash screen first
  redirect("/splash")
}
