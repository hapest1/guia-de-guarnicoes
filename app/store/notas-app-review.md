# App Review Notes — Guia de Guarnições (iOS 1.0)

Texto conferido com o código do build. Copie o que está entre as linhas para
**App Store Connect → App Review Information → Notes** e troque o que está entre [COLCHETES].

---

Thank you for reviewing Guia de Guarnições. Below is the information requested under Guideline 2.1.

**Login:** The app has no account system. No sign-in is required; all content is available immediately after launch. There is no user-generated content, no messaging and no paid content.

**1. Screen recording**
Recorded on a physical iPhone running the latest iOS, starting from the Home Screen and app launch:
[LINK TO VIDEO]
The recording shows: app launch and the tracking (ATT) prompt → home screen with the "independent guide, not official" notice → browsing garrisons by Military Command and filtering by state → opening a city profile (units based in the city, how to get there, cost of living and housing, health, education, climate, culture and leisure, video) → saving the city and sharing it through the iOS share sheet → "Mapa" tab (Locais de servir) → "Rota" tab (route planner) → "Mais" tab: transfer calculator, moving-allowance calculator, "Comparar", arrival checklist, transit hotels, guides → "Salvos" tab → Airplane Mode: saved city still opens → "Mais" → Sobre, privacy policy, contact e-mail and website link.

**2. Purpose and target audience**
Guia de Guarnições is a free reference guide to the 171 Brazilian cities that host an Army garrison. It is aimed at Brazilian military personnel and their families who receive a transfer order and need to decide where to live and how to organize the move, often to a city they have never visited. Each city has a profile built on the same template (units based there, how to get there, cost of living and housing, health care, schools, climate, culture and leisure), so cities can be compared side by side. The app also offers practical tools: a transfer calculator, a moving-allowance calculator, an arrival checklist, a road-trip route planner, a map of where each branch serves and a searchable list of Army transit hotels. The problem it solves: this information is scattered across news sites, forums and official publications; the app gathers it in one place, in a consistent format. It is an independent publication and is not an official product of the Brazilian Army or any government body; this is stated at the bottom of every screen, in the menu, in the "Mais" list and in "Mais → Sobre o Guia".

**3. Setup and access instructions**
No setup, credentials, sample files or special hardware are needed.
1. Open the app. iOS asks for tracking permission (either answer works). The home screen shows a search field, filters by Military Command and by state, and the eight Military Commands.
2. Tap a Military Command (or pick a state in the filter), then a city, to open its profile. The section bar inside the profile jumps to housing, health, education, climate, etc. "Salvar" stores the city on the device; "Compartilhar" opens the iOS share sheet.
3. Native tab bar: Início, Mapa (where each branch serves), Rota (route planner), Salvos (saved and recently viewed cities), Mais.
4. "Mais" opens a native list with: Calculadora de Transferência (e.g. origin Santa Maria-RS, destination Boa Vista-RR, 3 dependents), Calculadora de Ajuda de Custo, Comparar guarnições (two cities side by side), Checklist da chegada (26 items that can be ticked; ticks are stored on the device), Hotéis de Trânsito (search by state and audience; contact and booking are done on the official Army system linked there), Guias, the eight Military Commands, Sobre o Guia, contact e-mail, website link, privacy policy and app permissions.
5. Rota: type origin and destination (or tap "Usar a minha localização como origem", the only place location is requested) to get distance, fuel, tolls, fuel stations and transit hotels along the way. This screen needs an internet connection.
All city profiles, guides, calculators and tools are bundled inside the app and work offline. Only city photos, videos, the route calculation, the contribution form and ads need a connection; without one the app shows a notice in their place.

**4. External services used**
- Google AdMob (banner ads) with Google UMP consent; the App Tracking Transparency prompt is shown before any ad is requested.
- OpenStreetMap public services for the route planner: OSRM (router.project-osrm.org, routing.openstreetmap.de) for the route and Nominatim (nominatim.openstreetmap.org) to locate cities.
- Wikimedia Commons (upload.wikimedia.org): city photos, credited with author and license.
- YouTube: third-party city videos, credited and opened in the in-app Safari view (thumbnails from i.ytimg.com).
- FormSubmit (formsubmit.co): delivers the optional "Contribua com o Guia" form by e-mail.
No analytics or crash-reporting SDK, no Firebase, no maps SDK, no authentication service, payment processor or AI service is used. Links to Google Maps, the Army's transit-hotel system and other sources open outside the app content, in Safari.

**5. Regional differences**
The app's features and content are identical in every country where it is available. The content is in Portuguese and refers to Brazilian cities; there are no region-locked features.

**6. Regulated industry / third-party material**
The app does not operate in a regulated industry and does not provide any official or certified service. All city profiles, calculators, checklists and guides are original editorial content written by the developer from public sources (press, municipal and state bodies, IBGE and openly published Army material), with the methodology and sources credited inside the app. City photos come from Wikimedia Commons under free licenses, credited on each photo; videos are third-party YouTube videos, credited and played on YouTube. Fuel-station and toll data come from OpenStreetMap. No military emblems, logos, insignia or photographs of uniformed personnel are used, and the app does not claim affiliation with the Brazilian Army or any government body. Transit-hotel data is public information compiled from the official system, with the source credited; reservations are made through the official channel, not in the app.

**Business model**
The app is free and is supported by AdMob banner ads. There are no in-app purchases.

**Privacy and contact**
- Privacy policy: https://guiadeguarnicoes.com/privacidade#app (also inside the app: Mais → Política de privacidade)
- Contact: guiadeguarnicoes@gmail.com

---
