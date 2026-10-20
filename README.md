# BZF Trainer – aufs Handy und mit anderen teilen

261 unveränderte Originalfragen (Bundesnetzagentur, Katalog ab 01.05.2024), Lernrunden, Prüfungssimulation, Merkliste, Lernstand und Sicherungen. Keine Anmeldung, keine externen Bibliotheken, keine Analyse- oder Werbedienste.

Projekt-Webadresse: **https://jaktoth.github.io/bzf-trainer/**. Die Website wird über GitHub Pages veröffentlicht. Der Lernstand bleibt ausschließlich im eigenen Browser; persönliche Sicherungen gehören nicht ins Repository.

Aktuell: **Version 3.2 – klassisches Luftfahrtblau**, mit mittig ausgerichtetem Flugzeug und tiefer gesetztem BZF-Schriftzug. Die Versionsnummer steht unten neben „Lernregeln & Sicherung“. Das Speicherformat bleibt v3; bestehende Lernstände und Sicherungen bleiben kompatibel.

## 1. Dateien bereitstellen

1. ZIP entpacken. Die Dateien `index.html`, `manifest.webmanifest`, `sw.js`, `icon-192.png` und `icon-512.png` müssen nebeneinander liegen.
2. Auf GitHub anmelden und mit **New repository** ein neues Repository anlegen, z. B. `bzf-trainer`. **Public** auswählen. Keine Zugangsdaten oder persönlichen Sicherungsdateien hochladen.
3. **Add file → Upload files** wählen und die entpackten Dateien hochladen, nicht das ZIP und nicht einen zusätzlichen übergeordneten Ordner. Mit **Commit changes** speichern. Der Branch soll `main` heißen.
4. **Settings → Pages → Build and deployment**: **Deploy from a branch**, Branch **main**, Ordner **/(root)** auswählen und **Save** drücken.
5. Nach wenigen Minuten steht dort der Link, normalerweise `https://DEIN-NAME.github.io/bzf-trainer/`. Öffnen und weitergeben. Die Veröffentlichung ist öffentlich; jeder mit dem Link kann die App verwenden.

GitHubs Beschriftungen können sich ändern. Diese Dateien sind ohne Build-Schritt veröffentlichbar. Die Schritte oben gelten auch, wenn du eine eigene Kopie des Trainers unter deinem GitHub-Konto veröffentlichen möchtest.

## 2. Am Handy installieren

- **iPhone / Safari:** Link öffnen → Teilen → Zum Home-Bildschirm → Hinzufügen.
- **Android / Chrome:** Link öffnen → Menü → App installieren / Zum Startbildschirm hinzufügen.
- Einmal vollständig mit Internet laden. Unter **Lernregeln & Sicherung** muss **Offline bereit** stehen. Danach kann die App ohne Netz verwendet werden. Installation ist nicht nötig, um einfach im Browser zu üben.
- Die Offline-Installation benötigt HTTPS (GitHub Pages liefert HTTPS). Direktes Öffnen einer heruntergeladenen HTML-Datei bietet keinen Service Worker. `index.html` selbst bleibt auch als lokale Datei ohne externe Bibliotheken nutzbar.

## 3. Deinen bisherigen Lernstand mitnehmen

1. Im **bisherigen Trainer** zuerst **Lernregeln & Sicherung → Lernstand sichern** drücken. Die JSON-Datei sicher aufbewahren.
2. Im neuen Trainer **Sicherung wiederherstellen** wählen, die JSON-Datei auswählen und **Sicherung übernehmen** bestätigen. Version-2-Sicherungen werden auf Version 3 migriert; vorhandene Versuche, Fehler, Runden und laufende Prüfungszeiten bleiben erhalten. Sterne starten bei alten Sicherungen leer.
3. Eine laufende Prüfung läuft während des Umzugs zeitlich weiter. Ist die Frist abgelaufen, wird sie ausgewertet.

**Wichtig:** Der Lernstand liegt pro Browser, Gerät und Website-Adresse in `localStorage`. Ein neuer Link, anderer Browser oder anderes Gerät übernimmt nichts automatisch. Es gibt keine Cloud-Synchronisation. Insbesondere ein alter iframe-Trainer hat einen anderen Speicherbereich: dafür den beschriebenen Export/Import nutzen. Regelmäßig **Lernstand sichern**; die Anzeige erinnert an das Datum der zuletzt zum Download bereitgestellten Sicherung. Bitte den tatsächlichen Download kontrollieren. Browserdaten löschen kann den Lernstand und den Offline-Cache löschen.

Die Seite liest bei Bedarf den früheren direkten Speicher `bzf-trainer-v2`, schreibt neue Daten aber ausschließlich nach `bzf-trainer-v3`. Alte Daten werden dabei nicht gelöscht. Die ZIP-Datei enthält keinen persönlichen Lernstand. Sicherungsdateien deshalb nicht ins öffentliche Repository legen.

## 4. Bedienung

- **Üben:** Thema, Auswahl und Rundenlänge wählen. Antwort auswählen → Antwort prüfen → derselbe Button wird zu Nächste Frage. Fehler, früher falsche Fragen, fällige Wiederholungen und gemerkte Fragen lassen sich gezielt wiederholen.
- **Gemerkt:** Stern ☆ an einer Frage antippen. ★ = gemerkt. Im Reiter Gemerkt nach Thema filtern, entfernen oder eine Lernrunde starten. Weniger als 30 passende Fragen werden vollständig abgefragt.
- **Tastatur:** 1–4 wählt A–D in der sichtbaren Reihenfolge. Enter prüft/geht weiter. Eingabefelder/Dropdowns sind ausgenommen. Enter auf einem fokussierten Button führt nur dessen normale Aktion aus. Die Prüfungsabgabe muss immer bestätigt werden.
- **Lernstand:** Gesehen = mindestens 1 Versuch; Bereits wiederholt = mindestens 2 Versuche; Sehr sicher = mindestens 3-mal in Folge richtig. Ein Fehler setzt die Serie zurück. Die Abdeckung zählt beantwortete Versuche, nicht nur richtige Antworten.
- **Prüfung:** 100 unterschiedliche Fragen, 60 Minuten, bestanden ab 75 richtigen Antworten. Antworten sind bis zur Abgabe änderbar. Keine Lösungen während der laufenden Prüfung. Nicht beantwortete Fragen zählen als falsch, nicht als zusätzlicher Lernversuch.

## 5. Themenverteilung und Updates

Die tatsächliche Themenverteilung der Prüfung ist nicht bekannt. Diese Simulation verteilt 100 Plätze proportional zur Fragenzahl je Thema nach **Largest Remainder** (mindestens 1 je Thema). In `index.html` nach `EXAM_TOPIC_COUNTS` suchen. Der Wert `null` verwendet die automatische Verteilung. Alternativ ein Objekt mit **allen exakten Themennamen und ganzen Anzahlen** eintragen: Summe 100, je Thema mindestens 1, höchstens so viele wie im Katalog vorhanden.

Bei jeder Änderung **`CACHE_VERSION` in `sw.js` erhöhen**, z. B. von `v3-3` auf `v3-4`, und alle geänderten Dateien erneut hochladen. `APP_VERSION` im Worker muss zur sichtbaren Versionsnummer und zu `data-app-version` in `index.html` passen. Neue Versionen werden beim Öffnen mit Internet geladen; eine bereits geöffnete Seite anschließend neu laden. Eine neue Datei allein ohne erhöhte Cache-Version kann wegen Cache-first weiter in der alten Version erscheinen. Den Lernstand vorher sichern; Updates selbst löschen den Lernstand nicht. Eine installierte Web-App bei Bedarf vollständig schließen und erneut öffnen, kurz warten und nochmals neu öffnen. Nicht die App deinstallieren oder Browserdaten löschen. Ob und wann ein bereits angelegtes Home-Screen-Symbol ersetzt wird, entscheidet das Betriebssystem; die Versionsnummer in der App zeigt zuverlässig, welche Oberfläche geladen ist.

## Hinweise

Die Simulation ist eine Lernhilfe, kein offizielles Prüfungsangebot. Sie deckt den Kenntnisteil ab. Sprechfunkpraxis und beim BZF I englisches Lesen/Übersetzen bleiben zusätzliche Bestandteile. Die veröffentlichte Fragegrundlage ist der beigefügte Katalog von 2024; spätere amtliche Änderungen sind nicht automatisch enthalten. Vor einem öffentlichen Weiterbetrieb Nutzungs-/Weitergabebedingungen der Fragequelle und die geltenden Prüfungsbedingungen prüfen.
