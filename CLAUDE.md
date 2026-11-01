# Fach-Vokabeln – Projektbeschreibung für Claude

> **Für Claude:** Lies diese Datei zuerst. Sie ersetzt das Durchlesen des gesamten Quellcodes.
> Fordere nur die Dateien an, die für die gewünschte Änderung wirklich nötig sind (siehe „Welche Dateien für welche Änderung“).
> Hochgeladene Dateien liegen unter `/mnt/user-data/uploads/`. Lies sie gezielt mit `grep -n` und `sed -n 'von,bisp'`, statt sie komplett anzuzeigen.
> Liefere am Ende **nur die geänderten Dateien** aus (Claude kann das Repo auch selbst klonen, siehe „Hosting“). Bei Änderungen an App-Dateien (`app.js`, `style.css`, `index.html`, `sw.js`, `manifest.json`) `VERSION` in `sw.js` erhöhen; reine Inhaltsänderungen in `modules/` brauchen das nicht. Änderungsprotokoll unten ergänzen.

## Nächste Schritte

> **Für Claude:** Fragt der Nutzer nach den nächsten Schritten, nenne die offenen Punkte (☐) dieser Liste. Neue größere Vorhaben hier einreihen, erledigte abhaken und ihre Ergebnisse in die passenden Abschnitte dieser Datei übernehmen, statt lange Ablaufpläne stehen zu lassen.

1. ☑ **IT-Kategorien aufteilen** (v17): 35 Kategorien mit 30–49 Begriffen, Lernstand bewusst neu gestartet.
2. ☑ **Lernrahmen L1–L3** (v18–v21): drei Teile pro Begriff, Bremse, KI-Prüfung, Krönchen. Regeln unter „Spielregeln“, Hintergrund unter „Lernrahmen: Hintergrund und Entscheidungen“.
3. ☑ **CLAUDE.md nachgezogen**: alle Abschnitte auf dem Stand des Lernrahmens.
4. ☑ **Echter Test der KI-Prüfung** (mit `tools/ki-test.html`): alle 16 Testfälle von `explain-ai` mit dem erwarteten Urteil. Bei späteren Änderungen am KI-Block (`KI-START` … `KI-ENDE` in `app.js`) oder an `AI_MODEL` die Testseite erneut laufen lassen.
5. ☑ **`levels` aus den Moduldateien gestrichen** (per Skript, beide Module).
6. ☑ **Quiz-Baukasten** (v40–v47, sechs Chats): Fragearten als Bausteine der App, Stufen und ihre Fragearten pro Modul in `module.json`, Lernstand v3. Endgültige Stufenpläne für IT und Agile eingetragen. Hintergrund unter „Quiz-Baukasten: Hintergrund und Entscheidungen“, der Arbeitsplan ist gelöscht.

## Was die App ist

Installierbare Web-App (PWA) zum Lernen englischer Fachbegriffe mit deutscher Übersetzung. Zielgruppe: der Nutzer selbst (Österreich), Android-Handy, Chrome. Später sollen auch Schulmodule (z. B. Biologie, auch rein deutschsprachig) für den Sohn des Nutzers dazukommen; der Lernrahmen ist dafür für alle Module gleich.
Zwei Module: **IT** (`dev`, 1.305 Begriffe, violettes Schema) und **Agile & Projekte** (`agile`, 507 Begriffe, weinrotes Schema), beide mit Zusatzinhalten für alle Begriffe.
Jeder Begriff durchläuft die **Stufen** seines Moduls (`quiz.stages`, seit v40). Agile: **A** (Begriff und Bedeutung), **B** (Anwenden), **C** (Abgrenzen), **D** (In eigenen Worten, eine KI prüft); IT hat seit November 2026 einen eigenen Plan mit sechs Stufen „Level 1“ bis „Level 6“ (A–F). Der Standardplan für Module ohne Einstellung ist A/B/C wie bis v39. Die App kennt die Fragearten als Bausteine (Registry `KINDS`), das Modul legt fest, welche in welcher Stufe vorkommen. Nach der letzten Stufe ist ein Begriff **gelernt**; sind alle Begriffe eines Themas gelernt, bekommt das Thema ein **Krönchen**. Die App entscheidet selbst, was als Nächstes gefragt wird. Keine Punkte, Ränge oder Strafen.
Bereiche: Quiz (ändert den Lernstand), Karteikarten und Nachschlagen (ändern ihn nicht). Dazu Kalender (Fragen pro Tag), Schalter „Gerade kein Ton“, Blatt „KI-Prüfung“, Hilfe, Export/Import.
Jeder Nutzer wählt im Katalog „Module verwalten“, welche Module er verwendet; nur diese werden geladen und offline gespeichert (seit v13).

## Hosting und Updates

- GitHub-Repository **`baumpinkler/FachVokabeln`** (öffentlich), GitHub Pages aus Branch `main`, Ordner `/ (root)`.
- Adresse: `https://baumpinkler.github.io/FachVokabeln/`
- Claude kann das Repo selbst klonen (`git clone https://github.com/baumpinkler/FachVokabeln.git`); der Nutzer muss dafür nichts hochladen.
- Update = geänderte Dateien im Repository hochladen („Add file → Upload files“).
- `sw.js` → `VERSION` bei jeder Änderung an App-Dateien erhöhen (`"v16"` → `"v17"` …), damit Handys die Änderung sofort übernehmen. Module brauchen das nicht, sie aktualisieren sich im Hintergrund.
- Alle Pfade sind relativ. Keine Build-Tools, keine Bibliotheken, kein Framework.

## Dateien

| Datei | Größe | Inhalt |
|---|---|---|
| `index.html` | 1 KB | Gerüst (`#modbar` Modulleiste, darunter `#pager` mit `#top` und `#app`), Manifest-Link, Fonts (Google Fonts), setzt gespeichertes Farbschema vor dem Laden |
| `app.js` | 191 KB (~55.000 Tokens) | gesamte Logik |
| `style.css` | 158 KB (davon rund 100 KB SVG-Masken der Lichtfäden; nie ganz anzeigen, gezielt mit `grep -n` lesen) | gesamte Gestaltung, Farben über CSS-Variablen |
| `sw.js` | 3 KB | Service Worker: Offline-Cache, „sofort aus Cache, im Hintergrund aktualisieren“ |
| `manifest.json` | 1 KB | App-Name, Symbole, Startfarbe `#0a0510` |
| `icons/` | – | `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` |
| `modules/index.json` | 1 KB | Katalog aller Module (`desc`, `count` für „Module verwalten“) |
| `modules/<key>/module.json` | – | ein Modul, **genau eine Datei** inkl. Zusatzinhalte (`extra`); der Ordnername ist immer der `key` |
| `modules/dev/module.json` | 2,1 MB (~600.000 Tokens) | Modul IT, **nie komplett lesen oder einfügen** |
| `modules/agile/module.json` | 0,9 MB (~270.000 Tokens) | Modul Agile & Projekte, **nie komplett lesen oder einfügen** |
| `tools/ki-test.html` | 31 KB | Testseite für die KI-Prüfung: `https://baumpinkler.github.io/FachVokabeln/tools/ki-test.html`. Liest den **KI-Block** aus `app.js` (alles zwischen `/* KI-START` und `/* KI-ENDE */`: `AI_TASKS`, `aiSystem`, `aiUser`) und führt ihn aus, dazu `AI_MODEL`/`AI_MODEL_FALLBACK` per Regex; Musterlösungen, Zusatzinhalte und `quiz.ai.rubric` aus den Moduldateien. Schlüssel aus `lernapp.aikey` (gleiche Herkunft). 51 Testfälle in 5 Fragearten (16 für `explain-ai` wie seit dem Lernrahmen, 4 zum Hinweis des Moduls, je 7–9 für die neuen KI-Fragearten; 10 Grenzfälle), Filter nach Frageart, eigene Fälle (Frageart, Partner, Sprache, Hinweis), 1–3 Durchläufe, wartet bei 429 65 s, „Ergebnis kopieren“ liefert Text für den Chat. Die Daten für `aiUser` (`data`) und die Auswertung (`parse`) sind aus `aiTermData`/`aiData` bzw. `aiParse` nachgebaut: **bei Änderungen dort mitziehen**. Ändert den Lernstand nicht, ist nicht im Service-Worker-Cache vorgesehen |
| `tools/quiz-einstellungen.html` | 48 KB | Seite zum Zusammenklicken des Felds `quiz` eines Moduls: `https://baumpinkler.github.io/FachVokabeln/tools/quiz-einstellungen.html` (mit `#<key>` direkt ein Modul). Lädt `modules/index.json` und die Moduldatei, zeigt alle Fragearten × Stufen als Matrix (Zelle = Frageart in der Stufe, ⚙ = ihre Einstellungen, Stufenkopf = Einstellungen der Stufe, bis 6 Stufen), Modul-Einstellungen, Prüfung (erste Stufe ohne Auswählen, doppelte oder geänderte Stufen-IDs, Hören/Sprechen bei „Gerade kein Ton“, KI-Fragen pro Runde, Begriffe mit Abkürzung/Beziehungen/Verwechslungspartnern), „module.json herunterladen“ (nur `quiz` ersetzt, Rest unverändert, kompakt), „Für Claude kopieren“; „Neues Modul“ startet mit `DEFAULT_STAGES`, „Einstellung einfügen“ nimmt ein `quiz`-JSON. Fragearten und Grenzen sind aus `KINDS`, `kindConf`, `stageConf`, `quizConf` nachgebaut: **bei neuen Fragearten oder Einstellungen dort mitziehen** (Liste `KINDS` oben im Skript). Ändert nichts, ist nicht im Service-Worker-Cache vorgesehen |
| `tools/stimmen-test.html` | 6 KB | Testseite für das Vorlesen am Handy: `https://baumpinkler.github.io/FachVokabeln/tools/stimmen-test.html`. Listet alle Stimmen, die Chrome meldet, markiert die, die die App nimmt (`voiceFor` nachgebaut: **bei Änderungen dort mitziehen**), spielt einen Satz wie die App (feste Stimme) und nur mit Sprache (ohne feste Stimme) vor, „Ergebnis kopieren“ für den Chat. Ändert nichts |
| `docs/agile-projekte-begriffe.md` | 28 KB | abgesegnete Begriffsliste für Agile & Projekte (Kategorie, Englisch, Deutsch); nicht eigenmächtig ändern |

## Welche Dateien für welche Änderung

| Änderung | Betroffene Dateien |
|---|---|
| Farben eines Moduls | `modules/index.json` + Hinweis, welches Modul. Claude erzeugt ein kleines Skript bzw. die `theme`-Werte; das große JSON wird per Skript geändert, nicht gelesen |
| Aussehen, Abstände, Schriften | `style.css` |
| Lernrahmen, Auswahl, Quiz, KI-Prüfung, Kalender, neue Funktionen | `app.js` (+ ggf. `style.css`) |
| Neue Begriffe, Zusatzinhalte | die `module.json` nur per Skript bearbeiten (siehe „Inhalte schreiben“), `modules/index.json` (`count` mitpflegen). Keine `VERSION`-Erhöhung |
| Stufenplan eines Moduls (welche Fragearten in welcher Stufe, Abstände, Optionen) | `modules/<key>/module.json` per Skript, Feld `quiz` (siehe „Moduldatei“). Keine `VERSION`-Erhöhung. Stufen-IDs nicht ändern, an ihnen hängt der Lernstand ; der Nutzer klickt ihn meist mit `tools/quiz-einstellungen.html` zusammen und bringt das JSON mit |
| Neue Frageart | `app.js` (Eintrag in `KINDS`, ggf. eigene Bedienelemente) + `style.css`; Regeln unter „Fragearten“ und „Gestaltung neuer Fragearten“ ; Eintrag auch in `tools/quiz-einstellungen.html` |
| Neues Modul | neuer Ordner `modules/<key>/` mit `module.json` + Eintrag in `modules/index.json` (siehe „Neues Modul anlegen“). Keine Code-Änderung, keine `VERSION`-Erhöhung; nur eigene Krönchen-Designs brauchen `app.js` + `style.css` |
| Katalog, Modulauswahl, Laden der Module | `app.js` (Bereich „Module laden“ und „Katalog“), `sw.js` (Daten-Cache) |
| Offline-Verhalten | `sw.js` |

Moduldateien nie in den Chat laden: per Skript nur die nötigen Spalten auslesen (z. B. `[1]` englischer Begriff), Änderungen per Skript zurückschreiben.

## Datenformat

### `modules/index.json` (Katalog)
```json
{"modules":[{"key":"dev","name":"IT","short":"IT","icon":"💻",
  "desc":"Englische Fachbegriffe aus Programmierung, …","count":1305,
  "ls":"devvokabeln.progress.v1","doc":"progress","accent":"#6c3fb8","board":"#0a0510"}]}
```
Reihenfolge in `index.json` = Reihenfolge in Katalog, Modulleiste und beim Wischen. Die Moduldatei liegt immer unter `modules/<key>/module.json` (kein Feld `file` mehr).
- `desc`: ein Satz für den Katalog. `count`: Zahl der Begriffe (per Skript aus `raw`), optional, bei Begriffsänderungen mitpflegen.
- `ls` = Speicherschlüssel des Lernstands, **pro Modul eindeutig, nie ändern** (sonst ist der Fortschritt weg). Neue Module: `ls` = `lernapp.progress.<key>`, `doc` = `progress-<key>`. `agile` behält seinen alten Wert `devvokabeln.progress.agile`. `dev` hat seit v17 `lernapp.progress.dev` (Neustart nach der Kategorie-Aufteilung, der alte Lernstand liegt ungenutzt unter `devvokabeln.progress.v1`).
- Optional `format`/`version` wie in der Moduldatei: Braucht ein Modul eine neuere App, zeigt der Katalog das schon ohne Download an.
- Ab 4 gewählten Modulen wird der Umschalter automatisch zum Auswahlmenü.

### Moduldatei `modules/<key>/module.json`
```
{ format:"fachvokabeln-modul", version:2, key, name, short, icon,
  cats:   { "net": {"name":"Netzwerk","c":"var(--n-sky)"}, … },
  lang:   { term:"en-US", meaning:"de-AT" },          // optional, Standard genau diese Werte
  quiz:   { round, lockstep, options, flashcards, typing, ai, stages:[…] },   // optional, siehe unten
  theme:  { board, board-dot, ink, ink-soft, surface, line, ok, bad, accent, m1, m2, m3 },
  raw:    [ Eintrag, Eintrag, … ],
  extra:  { "<begriffs-id>": {ex, sit, conf, tf}, … } }
```
Kompakt gespeichert (`separators=(",",":")`, `ensure_ascii=False`, ohne Zeilenumbruch am Ende). Die App (`MOD_FORMAT`, `MOD_VERSION` in `app.js`) lädt nur `format` „fachvokabeln-modul“ mit `version` ≤ 2; sonst „braucht eine neuere App-Version“. Module mit `quiz.stages` haben `version: 2` (IT und Agile seit v40). `index.json` bekommt bewusst keine `version` (siehe Änderungsprotokoll v40). Ohne gültiges JSON, `raw` oder `cats` gilt das Modul als fehlerhaft.
`extra` (optional, seit v16, direkt nach `raw`): Zusatzinhalte für schwere Fragearten, Schlüssel = Begriffs-ID (Format und Regeln unter „Zusatzinhalte“; seit v47 auch `abbr` und `rel`). Fehlt das Feld oder fehlt ein Inhalt, entfallen die betreffenden Fragearten und Häkchen in Teil B. Ändern immer per Skript: JSON laden, `extra[id]` setzen, kompakt zurückschreiben.
`theme`: `board` Hintergrund (fast schwarz), `surface` Flächen, `accent` Modul-Schalter, `m1`/`m2`/`m3` die drei Startseiten-Kärtchen (Karteikarten/Quiz/Nachschlagen).
`lang` (optional, seit v18): Sprache der Begriffe (`term`, Vorlesen und Sprechen des Begriffs) und der Bedeutung (`meaning`, Vorlesen der Bedeutung und Situationen, Diktat in Teil C). Ein deutschsprachiges Schulmodul hat beide auf `de-AT`. Situationen und Stimmt-das-Aussagen sind in `meaning`-Sprache.
`quiz` (optional, seit v40; ersetzt `parts` aus v39): Stufen und Fragearten des Moduls. Kein ausführbarer Code, nur Einstellungen; `quizConf` liest, prüft und stutzt zurecht.
```json
"quiz":{
  "round":10,             // Fragen pro Runde, 3–20
  "lockstep":true,        // Gleichschritt; false = jedes Thema in seiner Stufe, Themen gemischt
  "options":5,            // Antwortmöglichkeiten, 2–6 (Standard für alle Stufen)
  "flashcards":true,      // Karteikarten anbieten (false: Kachel und Hinweise fallen weg)
  "help":"…",             // optional: Satz für die Hilfe unter der Einleitung (bis 400 Zeichen), z. B. warum eine Stufe fehlt
  "typing":{"typosPer":6,"caseSensitive":false},   // 1 Tippfehler je angefangene typosPer Buchstaben (3–20)
  "ai":{"rubric":"…"},    // zusätzlicher Bewertungshinweis für alle KI-Fragearten (bis 600 Zeichen, seit v45, siehe „KI-Prüfung“)
  "stages":[              // höchstens 6, Reihenfolge = Reihenfolge der Stufen
    {"id":"bedeutung","name":"Begriff und Bedeutung","short":"A",
     "kinds":[{"kind":"meaning-to-term","minCorrect":3},"term-to-meaning"],
     "waitDays":0,        // Tage Abstand zum Abschluss der vorigen Stufe (0–30; fehlt: 1, bei der ersten egal)
     "perRound":10,       // höchstens so viele Fragen dieser Stufe pro Runde (1–round)
     "minCorrect":5,      // zusätzlich zu allen Häkchen: Mindestzahl richtiger Antworten (0–30)
     "options":5,         // Antwortmöglichkeiten in dieser Stufe
     "timeLimit":0}]}     // Sekunden pro Frage, 0 = aus, sonst 5–120 (alle Fragearten außer KI, siehe „Zeitlimit“)
```
- Eine Frageart in `kinds` ist ein Name oder `{"kind", "inputs", "outputs", "minCorrect", "options"}`; `translate-sentence` nimmt statt `outputs` das Feld `directions` (`"en-de"`, `"de-en"`, Standard beide), ebenso `abbreviation` (`"short-long"`, `"long-short"`, Standard beide). KI-Fragearten nehmen zusätzlich `rubric` (Bewertungshinweis nur für diese Frageart in dieser Stufe, bis 300 Zeichen, kommt zu `quiz.ai.rubric` dazu), `own-sentence` nimmt `language` (`"meaning"` = Satz in der Bedeutungs-Sprache mit dem Begriff in der Begriffs-Sprache, Standard; `"term"` = Satz ganz in der Begriffs-Sprache). `inputs`/`outputs` schränken auf einen Teil der Ein-/Ausgabearten der Frageart ein (unbekannte Werte fallen weg; bleibt nichts übrig, gelten alle). `minCorrect` pro Frageart zählt nur, wenn der Begriff Inhalte für sie hat.
- Bekannte Fragearten (`KINDS` in `app.js`): `meaning-to-term`, `term-to-meaning`, `gap`, `situation`, `truefalse`, `difference`, `explain-to-term`, `term-to-explain`, `which-situation`, `translate-sentence`, `wrong-term`, `multi-truefalse`, `build-sentence`, `letter-gaps`, `dictation`, `pronounce`, `explain-ai`, `own-sentence`, `difference-ai`, `simple-explain`, `use-case`, `abbreviation`, `related`. Unbekannte werden ignoriert, Stufen ohne bekannte Fragearten übersprungen, doppelte Fragearten in einer Stufe zählen einmal. Eine Frageart darf in mehreren Stufen vorkommen; ihre Häkchen gehören dann jeweils zur Stufe.
- `id`: Kleinbuchstaben, Ziffern, `-`/`_`, eindeutig (fehlt: `stufe1` …). **Nicht mehr ändern**, sobald jemand damit lernt: Der Lernstand hängt an der ID. `short` (bis 3 Zeichen, fehlt: A, B, C …) erscheint auf Übersicht und im Nachschlagen, `name` (bis 40 Zeichen) in Rückmeldungen.
- Fehlt `quiz` oder gibt es keine gültige Stufe, gilt der Standardplan `DEFAULT_STAGES` (= Agile: A/B/C wie bis v39). Übergang: ein Modul ohne `stages`, aber mit `parts` (v1) bekommt die passenden Stufen des Standardplans.
- Eine Stufe für neue Begriffe braucht eine Frageart mit Auswählen: Schreiben, Sprechen und KI-Fragearten gibt es erst nach einer richtigen Antwort.
- IT: Stufen `level_1` bis `level_6` (A–F, alle `waitDays` 0), dazu `help` (warum es keine Stufe „Begriff und Bedeutung“ gibt) und `typing.typosPer` 5. Agile: `bedeutung` (A), `anwenden` (B), `abgrenzen` (C), `erklaeren` (D). Inhalt siehe „Stufenpläne von IT und Agile“.
`levels` (XP-Ränge) gibt es seit dem Lernrahmen nicht mehr; aus IT und Agile entfernt, die App ignoriert das Feld, falls es noch irgendwo steht.

### Ein Begriff (`raw`-Eintrag, Array)
| Index | Inhalt | Regel |
|---|---|---|
| 0 | Kategorie-Schlüssel | muss in `cats` existieren |
| 1 | englischer Begriff | eindeutig im Modul; die ID wird daraus gebildet (Kleinbuchstaben, Sonderzeichen → `-`). Verben mit „to “ |
| 2 | deutsch, mit Artikel | z. B. `die Datenbank / die DB`; gegendert mit `:in` |
| 3 | Erklärung 1 | darf den englischen Begriff **nicht** enthalten |
| 4 | englischer Beispielsatz | soll den Begriff wörtlich enthalten (ohne „to “), sonst keine Lückentext-Frage |
| 5 | deutscher Beispielsatz | österreichischer Arbeitsalltag |
| 6 | Erklärung 2 | anderer Blickwinkel (Beispiel, Einsatz) – ohne den Begriff |
| 7 | Erklärung 3 | anderer Blickwinkel (Zweck, Abgrenzung) – ohne den Begriff |
| 8 | optional: Lücken im deutschen Satz | Array exakter Teilstrings aus [5], z. B. `["sperrt","aus"]`; nötig, wenn [4] den Begriff enthält |

## Spielregeln: der Lernrahmen

Grundsätze: Fehler haben **keine Folgen** (richtige Lösung zeigen, weiter), es zählen nur richtige Antworten, „fast richtig“ zählt als richtig. Was ein Begriff an Inhalten nicht hat, wird nicht verlangt. Kann ein Gerät etwas **gar nicht** (kein `speechSynthesis` oder keine Stimme für die Sprache, kein `SR`), gelten die betroffenen Häkchen als erfüllt (`autoChecks`, nicht gespeichert), sonst bliebe ein Begriff für immer hängen.

**Begriffe:** Ausgabearten Lesen (Text steht da) und Hören (wird vorgelesen, steht nicht da, 🔊 zum Wiederholen). Eingabearten Auswählen (Standard 5 Antworten), Schreiben (`checkTyped`), Sprechen (🎤). Bedeutung = deutsche Übersetzung (Index 2), beim Vorlesen wird „ / “ zum Komma (`sayable`).

### Stufen (seit v40, Quiz-Baukasten)
Die Stufen kommen aus `quiz.stages` des Moduls (Format unter „Moduldatei“), gelesen von `quizConf` in `QZ`/`STAGES`. Jede Stufe hat Fragearten; jede Frageart bringt für einen Begriff Häkchen (Inhalte, Ausgabe- und Eingabearten).
- **Aktuelle Stufe** (`curIdx`): erste Stufe ohne Abschlusstag `d`; alle haben `d` = **gelernt** (`learned`). Neue Begriffe (ohne Eintrag, `isNew`) stehen in der ersten Stufe.
- **Geschafft** (`stageComplete`): alle Häkchen der Stufe (`stageContent(t, st).checks` ohne `openChecks`) und die Mindestzahlen (`minsMet`: `minCorrect` der Stufe und der Fragearten). Hat ein Begriff für eine Stufe gar keine Inhalte, gilt sie als geschafft. `record` setzt `d` nach einer Antwort, `autoFinish` (Übersicht, Rundenstart) schließt Stufen ohne Offenes nach der Bremse ab, auch mehrere hintereinander.
- **Machbar** (`doable`): Hören nur mit Ton und Stimme für die Sprache der Frageart (`MOD.lang[def.lang]`), Sprechen nur mit Ton und `SR`, Schreiben/Sprechen und freier Text für die KI (Eingabeart `free`, seit v45) erst nach einer richtigen Antwort zu diesem Begriff (`s.n`), KI-Fragearten nur bei `aiReady`.
- **Aufgabe** (`taskFor`): erst eine Frageart zufällig unter denen mit offenen Häkchen, darin die Aufgabe mit den meisten offenen Häkchen. Sind alle Häkchen da, fehlen aber richtige Antworten, kommt eine beliebige machbare Aufgabe (zuerst aus Fragearten mit unerfülltem eigenem `minCorrect`). Offen ist nur, was gerade nicht geht → `null`; `blockOf` sagt warum (`day`, `sound`, `ai`, `other`).
- **Krönchen:** Sobald alle Begriffe einer Kategorie alle Stufen geschafft haben (gelernt), `P.crowns[kat] = {day}` (`crownCheck`); Anzeige als `crownCard` in Rückmeldung und Rundenende, danach dauerhaft auf Übersicht und Nachschlagen. `autoFinish` prüft zusätzlich alle Themen (z. B. wenn ein geänderter Stufenplan Begriffe ohne Antwort zu gelernten macht; dann still, ohne Karte). Ein Krönchen bleibt, auch wenn ein späterer Stufenplan wieder etwas offen lässt.

### Fragearten (Registry `KINDS`)
Jede Frageart ist ein Eintrag `kind({…})` in `app.js` mit `id`, `name`, `refName`, `lang`, `outs`/`ins`, `ai`, `refs(t)` (Inhalte mit Häkchen `ck`), `outCk`/`inpCk`, `make(q)`, `ask(q)`, `help(kc)` (Beschreibung für die Hilfe, `kc` = Einstellung in der Stufe), optional `each` (Häkchen je Inhalt in der Hilfe, z. B. „jeder Satz einmal“), `body`, `fb`, `big`, `long`, `side`, `render`, seit v42 auch `outKey`/`outLabel` (eigene Ausgabearten wie die Richtungen beim Übersetzen), `pick(q, k)` (Zwischenschritt, z. B. Folgefrage), `controls(q, a)` + `wire(q)` (eigene Bedienelemente statt der Antworten), `tag` an einem Inhalt (Beschriftung im Nachschlagen), seit v43 `sayOnly` (Sprechen ohne Ändern von Hand) und die Eingabeart `build` (Wörter antippen) (Felder im Kommentar über `KINDS`). Pro Frage können `q.long`/`q.side` die Werte der Frageart überschreiben, `settle` nimmt eine eigene Notiz (`info.note`). Die Hilfe entsteht aus diesen Angaben, eine neue Frageart braucht also `help` (und ggf. `each`). Häkchen-Namen sind über alle Fragearten eindeutig. Neue Fragearten fügen sich in die allgemeine Darstellung (`renderQuiz`) und `qReveal` ein.
- `meaning-to-term` (Bedeutung → Begriff): Lesen/Hören (`o:read`, `o:hear`, Bedeutungs-Sprache), Auswählen/Schreiben/Sprechen (`i:pick`, `i:type`, `i:say`); eine Antwort hakt Ausgabe und Eingabe zugleich ab.
- `term-to-meaning` (Begriff → Bedeutung): Lesen/Hören (`r:read`, `r:hear`), nur Auswählen (deutsche Übersetzungen nicht zuverlässig prüfbar).
- `gap` (Lückensatz, nur Lesen): jeder Satz einmal (`c0` = Beispielsatz Index 4, nur wenn `termRe` passt; `c1`/`c2` = `ex`-Sätze) und jede Eingabeart (`ci:pick/type/say`). „Satz auf Deutsch zeigen“ als Hilfe.
- `situation` („Welcher Begriff passt?“): jede der 3 Situationen (`s0`–`s2`), Lesen/Hören (`so:read/hear`, Bedeutungs-Sprache), jede Eingabeart (`si:…`).
- `truefalse` (Stimmt das?): beide Aussagen (`t0`, `t1`), Stimmt/Stimmt nicht nebeneinander, danach Begründung.
- `difference` (Unterschied, `u0`, `u1`): maskierte Sätze mit A/B (`maskNames`); nur, wenn `confWrong` mindestens 3 verschiedene falsche Sätze findet (mehr als 3 falsche gibt es nie).
- `explain-to-term` (Erklärung → Begriff): jede der 3 Erklärungen (`x0`–`x2`, Index 3/6/7), Lesen/Hören in Bedeutungs-Sprache (`xo:*`), Auswählen/Schreiben/Sprechen (`xi:*`).
- `term-to-explain` (Begriff → Erklärung): jede Erklärung (`y0`–`y2`), Lesen/Hören des Begriffs (`yo:*`), nur Auswählen; Ablenker = Erklärungen anderer Begriffe, möglichst an derselben Stelle.
- `which-situation` (Welche Situation passt?): jede Situation (`ws0`–`ws2`) als richtige Antwort, Ablenker = Situationen anderer Begriffe. Lange Antworten, darum in IT/Agile mit `options` 3.
- `translate-sentence` (Satz übersetzen, `sentPairs`): jeder Satz (`ts0`–`ts2`: [4]/[5] und `ex`) und jede Richtung (`td:en-de`, `td:de-en`, Einstellung `directions`). Ablenker zuerst die anderen Sätze desselben Begriffs (sonst verrät der Begriff die Antwort), dann Sätze anderer Begriffe.
- `wrong-term` (Falscher Begriff im Satz, `gapSents`, `swapTerm`): markierter Begriff im Lückensatz, „Passt“/„Passt nicht“ nebeneinander. `wt0` = Satz stimmt, `wt1` = Begriff gegen einen gleicher Wortart vertauscht (Verben nur mit Verben, Großschreibung und „a“/„an“ angepasst); bei „Passt nicht“ und vertauschtem Begriff Folgefrage nach dem richtigen (`def.pick`), Weiter erst danach.
- `multi-truefalse` (Mehrere Aussagen, `foreignTf`, `mentions`): beide `tf`-Aussagen des Begriffs und zwei anderer Begriffe (nur solche, die ihren Begriff nennen), Mehrfachauswahl mit „Prüfen“ (Neon-Kästchen `.mt-box`). Richtig = beide eigenen richtig und höchstens eine fremde daneben („fast richtig“). Ein Häkchen `mt`.
- `build-sentence` (Satz bauen, `bsWords`): Satz in der Bedeutungs-Sprache, Wörter des Satzes in der Begriffs-Sprache durcheinander, der Reihe nach antippen (Eingabeart `build`, „Wörter antippen“, ohne vorherige richtige Antwort). Jeder Satz (`bs0`–`bs2`: Beispielsatz und `ex`, nur 3–12 Wörter). Satzzeichen am Ende fest, erstes Wort klein (außer Anfang des Begriffs). Richtig = Reihenfolge des Originals. Eigene Bedienelemente (`.bs-line`, `.bs-w`, „↶ Rückgängig“).
- `letter-gaps` (Buchstabenlücken, `lgLetters`): rund 40 % der Buchstaben verdeckt (Leerzeichen, Bindestriche, „to“ sichtbar), dazu die Bedeutung; ganzen Begriff schreiben. Ein Häkchen `lg`, nur ab 3 Buchstaben.
- `dictation` (Diktat): Begriff in `MOD.lang.term` hören, schreiben. Häkchen `dk` ist das Hören-Häkchen (`outCk`), damit gelten `autoChecks` und „Gerade kein Ton“.
- `pronounce` (Nachsprechen): Begriff lesen (🔊 „vorhören“), sprechen; Häkchen `pn` = Sprechen-Häkchen. `sayOnly`: Feld bleibt gesperrt, Abschreiben zählt nicht.
- `abbreviation` (Abkürzung, seit v47, nur Begriffe mit `extra.abbr`): Richtungen als Ausgabearten (`ab:short-long`, `ab:long-short`, Einstellung `directions`, `AB_DIRS`), Auswählen/Schreiben (`abi:pick`, `abi:type`, kein Sprechen). Beim Auswählen sind etwa die Hälfte der falschen Antworten abgewandelte Formen der richtigen (`abFakeLong`: ein Wort durch ein ähnlich langes mit gleichem Anfangsbuchstaben aus anderen Langformen ersetzt, `abWords`; `abFakeShort`: Buchstaben vertauscht oder ersetzt), der Rest Abkürzungen anderer Begriffe (gleicher Anfangsbuchstabe und gleiche Groß-/Kleinschreibung zuerst), sonst ließe sich die Langform an den Anfangsbuchstaben erraten. Beim Schreiben gilt `q.want` (siehe „Eingabe und Ton“).
- `related` (Gegenteil und Verwandte, seit v47, nur Begriffe mit Beziehungen): je Art ein Häkchen (`rl:opp` Gegenteil oder Gegenstück, `rl:syn` fast dasselbe, `rl:rel` hängt eng zusammen), nur Auswählen. Beziehungen gelten in beide Richtungen (`relIndex`/`relOf`, ein Paar zählt nur in einer Art: opp vor syn vor rel). Falsche Antworten nie aus den Beziehungen und `conf`-Partnern des Begriffs (beide Richtungen) und nicht mit dem Begriff als Teilwort; bei `rel` nur aus anderen Themen, weil im selben Thema vieles irgendwie zusammenhängt. Rückmeldung nennt weitere Begriffe derselben Art.
- `explain-ai` (In eigenen Worten, `c`): schreiben oder diktieren (🎤 in `MOD.lang.meaning`, wird angehängt, frei bearbeitbar), Gemini prüft (siehe „KI-Prüfung“). Falsch hat keine Folgen, neuer Versuch in einer späteren Runde. „Weiß ich nicht“ zeigt die Musterlösung ohne KI.
- **KI-Fragearten** (seit v45, alle mit `ai:true`, Eingabeart `free`, gemeinsame Darstellung `renderQuizC`, Prüfung `aiJudge` mit eigener Aufgabe in `AI_TASKS`). Texte und Daten kommen aus der Frageart: `cAsk`, `cBody`, `cWhat`/`cMine`, `cPlace`, `cNote`, `cOk`, `aiData(q)` (Daten für `aiUser`), `muster(q)` (Musterlösung als HTML), `lexText` (Nachschlagen, wenn die Stufe nur diese Frage hat). Sprache des Schreibens und Diktierens = `kc.lang`. Ein Häkchen je Inhalt, mit `tag` als Beschriftung im Nachschlagen.
- `own-sentence` (Eigener Satz, `os`): eigenen Satz mit dem Begriff schreiben; Sprache über `language` (Standard Bedeutungs-Sprache, der Begriff bleibt in der Begriffs-Sprache; `langOpt`). KI prüft: Begriff vorhanden, passend verwendet, Zusammenhang zeigt die Bedeutung („X ist wichtig“ reicht nicht); falsche Sprache zählt trotzdem, mit Hinweis. Beispielsätze ([4]/[5] und `ex`) gehen als Muster an die KI und als Musterlösung in die Rückmeldung.
- `difference-ai` (Unterschied erklären, `ud0`, `ud1`): je `conf`-Partner eine Frage; A und B mit ihren Bedeutungen stehen da (`.conf-pair`). KI bekommt beide Begriffe mit Bedeutung und Erklärungen und den `conf`-Satz als Mustersatz; vertauscht, nur eine Seite, nur Übersetzungen = falsch. Braucht anders als `difference` keine 3 falschen Sätze.
- `simple-explain` (Einfach erklärt, `se`): für jemanden ohne Vorwissen (etwa ein Kind mit zwölf); KI prüft Inhalt **und** Verständlichkeit (Fachwörter vermeiden oder erklären, Vergleiche erwünscht). Musterlösung „Fachlich erklärt“.
- `use-case` (Anwendungsfall, `uc`): wann passt der Begriff (einsetzen, Rolle spielen, auftreten), wann nicht; beide Teile nötig. Situationen (`sit`) gehen als Beispiele an die KI, eine davon als Musterlösung.

### Standardplan (`DEFAULT_STAGES`, für Module ohne `quiz.stages`)
- **A Begriff und Bedeutung** (`bedeutung`): `meaning-to-term` mit `minCorrect` 3, `term-to-meaning`; Stufe `minCorrect` 5.
- **B Anwenden** (`anwenden`, `waitDays` 1): `gap`, `situation`, `truefalse`, `difference`.
- **C In eigenen Worten** (`erklaeren`, `waitDays` 1, `perRound` 2): `explain-ai`.

### Stufenplan von IT (seit November 2026, vom Nutzer mit `tools/quiz-einstellungen.html` zusammengeklickt)
Alle Stufen `waitDays` 0 (keine Bremse), kein `perRound`, `typing.typosPer` 5. Der alte Lernstand (Stufen `anwenden`, `abgrenzen`, `erklaeren`) wird nicht mehr verwendet, alle Begriffe starten in Level 1.
- **A Level 1** (`level_1`, `options` 2): `explain-to-term` (nur Lesen, nur Auswählen), `abbreviation` (Abkürzung → Langform, nur Auswählen), `pronounce`, `explain-ai`.
- **B Level 2** (`level_2`, `options` 6): `explain-to-term` (nur Auswählen), `abbreviation` (Abkürzung → Langform, nur Schreiben), `situation` (nur Lesen, nur Auswählen, `options` 3), `term-to-explain` (nur Lesen).
- **C Level 3** (`level_3`, `options` 6): `gap` (nur Auswählen), `explain-to-term` (nur Hören, nur Sprechen), `term-to-explain` (nur Hören).
- **D Level 4** (`level_4`, `options` 6): `situation` (nur Hören; Schreiben und Sprechen), `which-situation` (`options` 3), `truefalse`, `multi-truefalse` (`minCorrect` 1), `difference` (`options` 4), `abbreviation` (Langform → Abkürzung, nur Schreiben), `related`, `wrong-term`, `gap` (Auswählen und Sprechen).
- **E Level 5** (`level_5`, `options` 6): `difference-ai`, `use-case`.
- **F Level 6** (`level_6`, `options` 6): `own-sentence`, `simple-explain`.

### Stufenplan von Agile (seit v47, mit dem Nutzer festgelegt; bis November 2026 auch für IT, dort ohne A)
- **A Begriff und Bedeutung** (`bedeutung`): `meaning-to-term` (`minCorrect` 3), `term-to-meaning`, `letter-gaps`; Stufe `minCorrect` 5.
- **B Anwenden** (`anwenden`, `waitDays` 1): `gap`, `situation`, `explain-to-term` (nur Lesen; Auswählen und Schreiben), `which-situation` (`options` 3), `abbreviation`, `related`, `build-sentence`.
- **C Abgrenzen** (`abgrenzen`, `waitDays` 1): `truefalse`, `multi-truefalse`, `difference`, `wrong-term`, `term-to-explain` (nur Lesen), `translate-sentence` (beide Richtungen).
- **D In eigenen Worten** (`erklaeren`, bis v46 Buchstabe C, `waitDays` 1, `perRound` 2): `explain-ai`, `own-sentence` (Satz auf Deutsch mit englischem Begriff).
- Nicht verwendet: `dictation`, `pronounce` (Hören und Sprechen würden Begriffe bei „Gerade kein Ton“ aufhalten), `difference-ai`, `simple-explain`, `use-case` (Gratis-Limit von Gemini), Zeitlimit. Jederzeit per Skript nachrüstbar (Stufen-IDs nicht ändern).
- Simulation (alle Antworten richtig, ohne Ton): A 5 Antworten (8 Häkchen, mit Ton etwas mehr), B meist 16 (27 Häkchen), C meist 13 (16 Häkchen), D 2. Ein Begriff braucht also fehlerfrei etwa 36 richtige Antworten über mindestens 4 Tage (mit dem alten IT-Plan ohne A etwa 31 über 3 Tage).

### Zeitlimit (seit v43)
`timeLimit` der Stufe (Sekunden pro Frage) gilt für alle Fragearten der Stufe außer KI-Fragearten, beim Schreiben und Sprechen mit derselben Zeit (`qTimeLimit`, `qTimerStart`, `qTimerHtml`, `qTimeout`). Die Uhr startet beim ersten Aufbau der Frage und läuft über Zwischenschritte weiter (Neuaufbau setzt die Linie per negativer `animation-delay` fort). Abgelaufen = wie falsch: `settle(false, {timeout:true})`, Lösung zeigen, zählt als Antwort, Begriff kommt später wieder; Rückmeldung „Zeit abgelaufen.“. Die Hilfe zeigt „Zeit“ in der Stufe und einen Abschnitt „Zeitlimit“. IT und Agile nutzen es noch nicht.

### Bremse
Eine Stufe ist frühestens `waitDays` Kalendertage nach dem Abschluss der vorigen dran (`waitLeft`, `daysSince`, Vergleich über `dayStr`/`parseDay`); die erste Stufe wartet nie. Im Standardplan braucht ein Begriff also mindestens 3 Tage, damit nicht alles an einem Abend aus dem Kurzzeitgedächtnis abgehakt wird.

### Auswahl der Fragen (`planRound`)
- Runde = bis zu `quiz.round` Fragen (Standard 10) aus den angehakten Themen (`P.cats`), pro Stufe höchstens `perRound`.
- **Gleichschritt** (`quiz.lockstep`, Standard an): Ebene eines Begriffs (`levelOf` = `curIdx`), gelernt = Zahl der Stufen. Ein Thema steht auf der niedrigsten Ebene seiner Begriffe (`catLevel`), gefragt wird nur auf der niedrigsten Ebene aller angehakten Themen (`roundLevel`, `quizPool`). Themen weiter vorne und Begriffe, die ihrem Thema voraus sind, pausieren (ihr Fortschritt bleibt). Die Quiz-Kachel zeigt „Gerade dran: Teil X“. Ohne Gleichschritt steht jedes Thema auf seiner eigenen Ebene und die Runde mischt die Themen.
- Am längsten nicht gefragt zuerst (`t`, nie gefragte zuerst), so kommen nach und nach alle Begriffe dran. Jeder Begriff nur einmal pro Runde. Ohne KI-Schlüssel warten Begriffe in einer KI-Stufe (`noTasksText` sagt das).
- Frage und Aufgabe werden erst beim Erreichen gebaut (`findNext`/`goQuestion`/`makeQuestion`), damit der Lernstand aktuell ist. Gibt es weniger Aufgaben, wird die Runde kürzer; gibt es keine, sagt `noTasksText` warum („Heute alles erledigt, morgen (bzw. in N Tagen) geht's weiter mit X Begriffen“, warten auf Ton, warten auf die KI-Prüfung, alles gelernt).
- Antwortmöglichkeiten: `options` der Frageart bzw. Stufe bzw. des Moduls (Standard 5, `q.n`, `optsFor`), unterschiedliche Anfangsbuchstaben (`keyLetter`, Artikel/„to“ zählen nicht), Ablenker zuerst aus derselben Kategorie (`distractors`), immer ganz sichtbar.

### Eingabe und Ton
- **Schreiben** (`checkTyped`, `typeNorm`, `lev`): Groß/Klein (außer `quiz.typing.caseSensitive`), führendes „to “, Bindestrich/Leerzeichen/Unterstrich egal; Levenshtein ≤ 1 je angefangene `quiz.typing.typosPer` Buchstaben (Standard 6) = „fast richtig“ (zählt als richtig). Exakt ein anderer Begriff des Moduls = falsch. Erwartet eine Frage etwas anderes als den Begriff (seit v47 `q.want`, z. B. die Langform einer Abkürzung), vergleicht `checkTyped(t, text, want)` mit `abNorm` (alle Satzzeichen egal, keine Verwechslungsprüfung); `q.inpText`/`q.inpPlace` ersetzen Hinweis und Platzhalter, „Richtig“ und „Fast richtig“ nennen `q.want`.
- **Sprechen:** Pro Frage nur eine Eingabeart, Hinweis „✍️ Schreib …“ bzw. „🎤 Sprich …“ über dem Feld. Beim Sprechen ist das Feld bis zur ersten Erkennung gesperrt; `listen` liefert bis zu 5 Varianten, die beste (richtig > fast richtig > Verwechslung > falsch, `heard`) kommt ins Feld. Unverändert abgeschickt = Sprechen, von Hand geändert = Schreiben. Spracherkennung braucht in Chrome meist Internet.
- **„Gerade kein Ton“** (Schalter unter der Quiz-Kachel, `lernapp.quiet`): kein Hören, kein Sprechen, bis zum Ausschalten. Diese Häkchen werden später nachgeholt; Begriffe, die nur noch sie brauchen, warten (`waitsForSound`), Übersicht und Rundenende sagen das. Teil C geht dann nur schriftlich.
- **Sprache pro Modul:** `MOD.lang = {term, meaning}` (Standard `en-US`/`de-AT`). Begriff vorlesen und sprechen in `term`, Bedeutung, Situationen und Diktat in `meaning` (`outLang`). `voiceFor` fällt von `de-AT` auf `de-DE` zurück. `stopSpeak` bricht das Vorlesen beim Antworten, Weiterschalten und Verlassen ab.
- **`conf`-Anzeige:** `maskNames` ersetzt englischen Begriff und deutsche Hauptwörter (ohne Artikel, `:in`, kleine Endungen) durch „A“/„B“.

### KI-Prüfung (KI-Fragearten, im Standardplan Stufe C)
- **Anbieter:** Google Gemini API, Gratis-Stufe, direkt aus dem Browser: `POST https://generativelanguage.googleapis.com/v1beta/models/<AI_MODEL>:generateContent`, Kopfzeile `x-goog-api-key`, `generationConfig.responseMimeType = "application/json"`. `AI_MODEL` = `gemini-3.5-flash-lite` (Stand Oktober 2026), bei 404 Rückfall auf `gemini-flash-lite-latest`. Modelle und Grenzen ändern sich: bei Problemen in der aktuellen Gemini-Doku (Preisliste, Spalte „Free Tier“) ein Flash-Modell der Gratis-Stufe wählen.
- **Schlüssel:** jeder Nutzer seinen eigenen, Blatt „KI-Prüfung“ (🤖 neben „Module verwalten“, Link zu Google AI Studio, „Speichern und testen“, „Testen“, „Entfernen“). Nur in `localStorage["lernapp.aikey"]`, **nie im Repo, nie im Export**. Hinweis im Blatt: In der Gratis-Stufe darf Google die Eingaben zum Verbessern der Modelle verwenden, also nur Antworten zu Fachbegriffen, nichts Persönliches.
- **KI-Block** (`/* KI-START` … `/* KI-ENDE */` in `app.js`, ohne Bezug zum Rest der App, weil `tools/ki-test.html` ihn ausführt): `AI_HEAD`, `AI_LENIENT`, `AI_TASKS` (Aufgabe und Bewertungsregeln je KI-Frageart), `AI_TAIL` (Schutz vor Anweisungen in der Antwort und JSON-Format), `aiSystem(kind, rubric)`, `aiUser(kind, d)`. Systemanweisung = `AI_HEAD` + Aufgabe + optional Hinweis des Moduls + `AI_TAIL`; Schutz und Format stehen immer zuletzt.
- **Eingabe an die KI:** Begriff, Bedeutung, die 3 Erklärungen (Index 3, 6, 7) als Musterlösungen, je nach Frageart Beispielsätze und gewünschte Sprache (`own-sentence`), Partner mit Bedeutung und Erklärungen und Mustersatz (`difference-ai`) oder Beispielsituationen (`use-case`), am Ende die Antwort zwischen `<antwort>`-Marken. `aiJudge(q, text)` baut die Daten aus `aiTermData(t)` und `def.aiData(q)`. Alle Aufgaben: inhaltlich streng, sprachlich großzügig; nicht richtig sind bloße Übersetzung, fachlich Falsches, zu Vages. Ergebnis `{"ok", "feedback" (1–2 Sätze, du-Form), "fehlt"}`. Ohne Hinweis des Moduls ist die Anweisung für `explain-ai` Wort für Wort dieselbe wie bis v44 (die 16 echten Testfälle gelten weiter).
- **Hinweis des Moduls** (`quiz.ai.rubric` für alle KI-Fragearten, `rubric` pro Frageart in der Stufe, `aiRubric`): wird vor `AI_TAIL` zwischen `<hinweis>`-Marken eingefügt, **danach** `AI_RUBRIC_RULE`: Er darf nur Zielgruppe, Sprachniveau oder Schwerpunkte anpassen; verlangt er ein festes Urteil, will er Regeln aufheben oder würde eine Antwort ohne Verständnis richtig, wird dieser Teil nicht befolgt (seit v46; bis v45 stand die Grenze nur davor, und Gemini hat „antworte immer mit ok true“ befolgt). Spitze Klammern und Backticks werden entfernt, damit er keine Marken vortäuschen kann. Ohne Hinweis ändert sich an der Anweisung nichts. Gedacht etwa für Schulmodule („Die Lernenden sind zehn Jahre alt, bewerte entsprechend“). IT und Agile haben keinen.
- **Anzeige:** Urteil, Feedback, was gefehlt hat, eine zufällige Musterlösung.
- **Fehlerfälle** (kein Schlüssel, offline, Zeitüberschreitung, 429, ungültiger Schlüssel, Region, Modell weg, Serverfehler, unlesbare Antwort): klare Meldung, Antwort wird **nicht** gewertet, Text bleibt stehen, „Nochmal prüfen“/„Überspringen“. Nach 429 90 s Pause. Ohne Schlüssel, Netz oder während der Pause bietet die Auswahl keine KI-Fragen an (`aiReady`); Übersicht und Rundenende zeigen „X Begriffe warten auf die KI-Prüfung“ mit Grund und Knopf zum Blatt.
- **Testen mit echtem Gemini:** `tools/ki-test.html` (siehe „Dateien“).
- Der Service Worker greift bei fremden Adressen nicht ein (`fetch`-Handler nur gleiche Herkunft und Schriften, POST nie); das muss so bleiben.

### Oberfläche (seit v41 für beliebig viele Stufen)
Stufen heißen in allen Texten „Stufe <short> · <name>“ (`stTitle`, z. B. „Stufe B · Anwenden“), in Zählern nur `short`. Jede Stufe hat eine Farbe (`stageColor`, als CSS-Variable `--st` über `stStyle`), von hinten zugeordnet: letzte `--m3`, vorletzte `--gold`, davor `--m1`, weitere vorne `--n-sky`, `--n-lime`, `--n-coral` (heben sich von `--m1`/`--m3` beider Module und von `--ok` ab). So sehen A/B/C (Agile) und B/C (IT) aus wie bisher.
- **Kopf:** gelernt-Zahl, gestapelter Balken der Stufen/gelernt (`barSegs`, `i.sb-st`), Legende je Stufe (Name als `title`), „Fragen heute“ (öffnet den Kalender).
- **Übersicht:** Quiz-Kachel mit „Gerade dran: ● B · Anwenden“ (Gleichschritt: Stufe der Runde; ohne Gleichschritt alle Stufen, in denen angehakte Themen stehen), „Gerade kein Ton“, Karteikarten (nur mit `quiz.flashcards`, sonst Nachschlagen über die ganze Breite, `.mode.wide`), Nachschlagen; Hinweise (nichts zu tun, warten auf Ton, warten auf KI); Themen mit Häkchen zum An-/Abwählen, „A 3 · B 2 · C 1 · ✓ 4 / 41“ und gestapeltem Balken, darüber eine Zeile, was die Buchstaben bedeuten; gekrönte Themen im Krönchen-Design.
- **Quiz:** Rückmeldung mit „Stufe A · … geschafft! 🎉 Ab morgen kommt Stufe B · …“ (`doneNote`, `nextText`) bzw. „Gelernt! 🎉“. Rundenende: richtig/gefragt, neue Häkchen, neue Krönchen, gelernte Begriffe, geschaffte Stufen (je Stufe mit dem Hinweis, wann die nächste kommt), daneben gegangene Begriffe, Warte-Hinweise.
- **Nachschlagen:** Etikett pro Begriff (`stageTag`: „A 3/7“, „B 5/16“, „C“, „✓ gelernt“, Farbe der Stufe). Im aufgeklappten Eintrag (`lexState`) eine Zeile pro Stufe (`.ls-row`: „✓ geschafft am …“, „jetzt dran · 3 von 7 Häkchen“, „kommt ab morgen dran“, „noch nicht dran“, „nichts zu tun“), unter der aktuellen Stufe fehlende Mindestzahlen (`minsText`) und die Häkchen (`checksHtml`, eine Zeile pro Frageart) bzw. bei KI-Stufen mit nur einer Frage pro Begriff `lexText` der Frageart und die Zahl der Versuche (mit mehreren KI-Fragen Häkchen und Versuche). Sortierung in einem Thema: gelernt zuerst, dann nach Stufe und darin nach Anteil der Häkchen (`stageWeight`, `stageProgress`), neue zuletzt, sonst alphabetisch.
- **Hilfe** („So lernst du hier“, `showHelp`): aus dem Stufenplan erzeugt. Einleitung mit allen Stufen, optional `quiz.help`; pro Stufe Fragearten mit Inhalten/Ausgabe/Eingabe/`minCorrect` (`kindSpec`), „Geschafft“ (`stageDone`, „alle Häkchen, meist N“ als häufigste Zahl über alle Begriffe, `typicalChecks`; KI-Stufe „die KI sagt: verstanden“, mit mehreren KI-Fragen „bei jeder Frage“), „Wann“ (`stageWhen`), „Pro Runde“, die `help()`-Texte der Fragearten. Danach nur, was im Modul vorkommt: Häkchen, Schreiben, Sprechen, Gerade kein Ton, KI-Prüfung, Abstand zwischen den Stufen, Gleichschritt bzw. „Jedes Thema für sich“, Auswahl, Gelernt und Krönchen, Karteikarten.
- **Karteikarten:** nur mit `quiz.flashcards`. 10 Karten (bis zu 5 begonnene Begriffe, deren Stufe `meaning-to-term` oder `term-to-meaning` enthält), „Nochmal“ legt die Karte nur ans Ende des Stapels.
- **Kalender:** Fragen pro Tag (richtig und falsch, `P.askLog`), Farben 1–9, 10–29, ab 30.

## Code-Landkarte `app.js`

| Bereich | Funktionen |
|---|---|
| Helfer, Begriffe | `buildTerms` (Begriffe aus `raw`, `t.expls` = Index 3/6/7), `esc`, `shuffle`, `dayStr`/`today`, `termRe`, `cloze`, `clozeDe`, `keyLetter`, `highlight`, `markTerm`, `num`, `pickOne`, `arr`, `own`, `listText` |
| Lernstand & Speicher | `P_VERSION` (3), `freshProgress`, `normProgress` (verwirft alles ohne `v:3`), `fixCats`, `save`; Cloud-Funktionen (`pushCloud`, `syncCloud`, `connectCloud`) sind Altlast aus claude.ai und außerhalb inaktiv |
| Sprache | `LANG_DEFAULT`, `langOf`, `langName` |
| Module laden | `CATALOG_ORDER` (alle aus dem Index), `MODULE_ORDER` (nur gewählte), `INDEX`, `loadIndex`, `ensureModule` (merkt laufende Downloads, prüft Format, setzt `extra` und `lang`, Fehler mit `code` `offline`/`missing`/`broken`/`newer`), `needsNewerApp`, `modErrText`, `applyTheme`, `loadModule`, `switchModule` (= `swipeTo`) |
| Modulauswahl | `initChosen`, `setChosen`, `hasProgress`, `unloadModule`, `dropModuleCache` |
| Katalog | `showCatalog`, `mountCatalog`/`catalogItems` (auch Willkommen-Seite), `enterModule`, `removeModule`, `showModulePicker` |
| Modulwechsel & Wischen | `renderModbar`, `initSwipe`, `swipeTo`, `snapBack`, `slide`, `settleAnim`; Hinweis einmalig über `lernapp.swipehint` |
| Übergänge | `transit(fn)`, `goHome` |
| Zusatzinhalte | `MOD.extra`, `extraOf` (geprüfte Inhalte), `nameVariants`, `maskNames`; `BYID` = Begriffe nach ID |
| Stand eines Begriffs | `stateOf`, `touch`, `stData`/`stRec` (Daten einer Stufe), `curIdx`, `isNew`, `learned`, `daysSince`, `waitLeft`, `whenText`, `stageCount`, `STAGE_COLORS`/`stageColor`/`stStyle` (Farbe `--st`), `stTitle`, `barSegs`, `stageParts`, `stageAria`, `stageProgress`, `stageWeight`, `catTerms`, `crowned`, `crownOf` + `CROWN_DESIGNS`/`CROWN_GENERIC` |
| Fragearten (seit v47 auch `AB_DIRS`, `abNorm`, `abWords`, `abFakeLong`, `abFakeShort` für Abkürzungen, `REL_KINDS`, `relIndex`, `relOf` für Gegenteil und Verwandte) | `OUTS`, `INPUTS`, `INP_LABEL`, `OUT_LABEL`, `outLabel`, `readHear`, `KINDS` + `kind({…})` (Registry, eine Zeile pro Frageart), `optsFor`, `confPairs`, `confWrong`; seit v42 `sentPairs`, `TR_DIRS`/`trFrom`/`trTo`/`trLang` (Übersetzen), `isVerb`, `sameClass`, `gapSents`, `swapTerm` (falscher Begriff), `mentions`, `foreignTf` (mehrere Aussagen); seit v43 `BS_MAX`/`bsWords` (Satz bauen), `lgLetters` (Buchstabenlücken); seit v45 `aiLangs`, `osExamples` (eigener Satz) |
| Einstellung & Stufen | `STAGE_MAX`, `DEFAULT_STAGES`, `clampInt`, `clipStr`, `kindConf`, `stageConf`, `quizConf` (→ `MOD.qz`, `QZ`, `STAGES`), `hasKind`; `termCache`, `kindRefs`, `stageContent` (Häkchen und Aufgaben pro Begriff und Stufe), `autoChecks(st)`, `openChecks`, `minsMet`, `stageComplete`, `doable`, `autoFinish` |
| KI-Prüfung | `AI_KEY`, `AI_MODEL`/`AI_MODEL_FALLBACK`, `aiKey`/`setAiKey`, `aiBlock`/`aiReady`, `aiStages` (Stufen mit KI-Frageart), `aiWaitText`, `crownCheck`, `aiCall` (Fehlercodes `AI_ERR`, `aiErrText`), `aiParse`, KI-Block (`AI_HEAD`, `AI_TAIL`, `AI_LENIENT`, `AI_TASKS`, `aiSystem`, `aiUser`), `aiTermData`, `aiRubric`, `aiJudge(q, text)`, `aiTest`, `showAiSheet`, `aiNotice`/`wireAiNotice` |
| Auswahl | `taskFor`, `hasTask`, `blockOf`, `waitsForSound`, `waitsForDay`, `waitsForAi`, `pool`, `levelOf`, `catLevel`, `roundLevel`, `quizPool`, `planRound`, `distractors` (mit Filter `fit`), `noTasksText` |
| Ton | `quiet`/`setQuiet`, `canHear` (`yes`/`wait`/`no`), `voiceFor`, `speak`, `sayable`, `speakBtn`, `SR`, `listen`/`stopListen` |
| Quiz | Zeitlimit `qTimeLimit`, `qTimerStart`, `qTimerHtml`, `qTimeout`; `startQuiz`, `findNext`/`countAhead`/`goQuestion`, `makeQuestion` (baut über `def.make`), `renderQuiz` (allgemein, nutzt `def.ask`/`body`/`fb`), `renderQuizC` (alle KI-Fragearten), `answer`, `heard`, `answerInput` → `settle`; `checkC` → `settleC`; beide → `record` (Zähler, Häkchen, `askLog`, Abschluss der Stufe, Krönchen), `nextText`, `doneNote`, `checksHtml`, `crownCard`, `nextQuestion`, `renderQuizDone`; Eintippen `checkTyped`, `typeNorm`, `lev` |
| Karteikarten | `startCards`, `renderCard`, `renderCardsDone` |
| Nachschlagen | `renderLex`, `lexItem`, `lexRel` (Abkürzung und Beziehungen, seit v47), `stageTag`, `minsText`, `lexState` |
| Startseite & Kopf | `renderHome`, `renderTop` |
| Fenster | `sheet`, `openDialog`, `showHelp` (mit `kindSpec`, `typicalChecks`, `stageDone`, `stageWhen`), `showCalendar`/`renderCalendar`, `showExport`/`buildExport`, `showImport`, `showAiSheet` |
| Zurück-Taste | `navPush`, `navEnterScreen`, `popstate`-Handler, `renderHome(fromPop)` |
| Sonstiges | `toast(msg, ms)`, `confetti`, `setFocus` (blendet Modulleiste und Kopf in Quiz/Karten/Nachschlagen aus) |
| Start | `boot` (ganz unten): `loadIndex` → `initChosen` → `renderWelcome` (nichts gewählt) oder `startChosen` (Startmodul, kaputte überspringen, sonst `renderNoModule`) → `startApp` (lädt nach 1,5 s die übrigen gewählten Module vor) |

## Gespeicherter Fortschritt (`P`, pro Modul in `localStorage[ls]`)

```
{v:3, terms:{id:{t, n, s:{<stufen-id>:{c:[…], n, x, k:{<frageart>:n}, d}}}}, crowns:{kat:{day}}, cats:[…], askLog:{tag:anzahl}, updatedAt}
```
- `t` = zuletzt gefragt (ms), `n` = richtige Antworten insgesamt (Schreiben und Sprechen erst ab 1). Pro Stufe (Schlüssel = Stufen-ID aus `quiz.stages`): `c` = Häkchen, `n` = richtige Antworten, `x` = Antworten (richtig und falsch, z. B. Versuche bei der KI-Prüfung), `k` = richtige Antworten pro Frageart (für `minCorrect` pro Frageart), `d` = Tag des Abschlusses. Ein Stufen-Eintrag entsteht bei der ersten Antwort in der Stufe.
- Aktuelle Stufe = erste Stufe des Plans ohne `d`; Einträge zu Stufen, die der Plan nicht (mehr) hat, werden ignoriert. Ein Begriff ohne Eintrag ist neu.
- Ein gespeicherter Lernstand ohne `v:3` (v2 mit Teil A/B/C, davor XP und Boxen) wird verworfen und sofort überschrieben.
- Tagesformat: `JJJJ-M-T` (ohne führende Nullen, siehe `dayStr`).
- Export: `{"format":"lernapp-fortschritt","version":3,"modules":{key:P},"summary":…}` (`summary` je Modul: `started`, bei geladenen Modulen auch `learned`). Import mit älterer Version wird mit Meldung abgelehnt, höhere Versionen ebenfalls.
- Weitere Schlüssel: `lernapp.aikey` (KI-Schlüssel, nie im Export), `lernapp.quiet` („Gerade kein Ton“), `lernapp.chosen` (Array der gewählten Modul-Keys), `devvokabeln.module` (zuletzt offenes Modul), `lernapp.theme` (Farbschema für den Start), `lernapp.swipehint`.
- Entfernen eines Moduls löscht nur den `lernapp.chosen`-Eintrag und den Daten-Cache, nie den Lernstand. Der Export enthält alle Module mit Lernstand, auch abgewählte; ein Import nimmt nicht gewählte Module in die Auswahl auf.

## Gestaltung und Konventionen

- Dunkle Modul-Schemata (Hintergrund fast schwarz mit Farbstich) mit weichem Schein der Modulfarbe oben (`body::before`); gedämpfte Pastellkarten für Kategorien (`--n-*` in `style.css`), abgerundet, ohne Drehung und Klebestreifen.
- Theme-Farben sind mit `@property` registriert und blenden beim Modulwechsel in 0,45 s über. Maße: `--r-lg/--r-md/--r-sm`, Kurven `--ease`/`--spring`, Flächen `--raise`, `--edge`, `--shadow`.
- Alles Tippbare federt beim Antippen (`scale(.965)`). Fenster (`dialog`) kommen als Blatt von unten, ab 700 px Breite mittig. Seitenwechsel blenden aus und wieder ein (`transit`: `#modbar` und `#pager` 130 ms aus, 220 ms ein, nichts verschiebt sich; Wechsel während des Ausblendens werden gesammelt). Keine View Transitions mehr (seit v20). `prefers-reduced-motion` schaltet alle Bewegungen ab.
- `#pager` hat `touch-action: pan-y pinch-zoom`, damit senkrechtes Scrollen beim Browser bleibt und waagrechtes Wischen bei der App.
- Schriften: Bricolage Grotesque (Überschriften), Atkinson Hyperlegible (Text).
- Farben der Stufen über `--st` (siehe „Oberfläche“; Balken `i.sb-st`, `.st-tag`, Punkte `.ls-dot`, `.q-st`), gelernt `--ok` (`i.sb-done`, `.st-tag.done`); gelernte Begriffe im Nachschlagen mit grünem Rand. Quiz: Lichtfäden wie in der Teamauswahl von FIFA 10 nur hinter der Frage. Eigenes Element `#qfx` direkt in `<body>` (angelegt von `qfxEl`), damit es beim Fragenwechsel nicht mit `#pager` ausgeblendet wird; nur im Quiz sichtbar (`.on`). Feste Höhe ab Seitenanfang (`--qfx-h`, 300 px), weich ausgeblendet links, rechts und unten (Maske auf `#qfx`). Drei weiße Lagen und eine Lage in der Akzentfarbe `--qa` (`.qfx-l`, bewegt per `transform`, nahtlose SVG-Kacheln) plus Nebel. Quiz-Frage `.note.qc` und Antworten `.opt` ohne Fläche und Rand, frei schwebend; nach der Antwort richtige Antwort hell mit grünem Schein, falsch gewählte rot und durchgestrichen, übrige ausgeblendet (`.dim`). `qfxShow(a)` nach jedem Aufbau der Quiz-Karte: `is-ok`/`is-bad` blenden `--qa` nach `--ok`/`--bad` und die Fäden voller (`--qfx-o` .28 → .5), bei der nächsten Frage zurück; `--qc-b` zählt die Antworten hoch und gibt per Übergang einen Schub (`translate` mit `mod()`, kein Zurückspringen). `qfxOff` in `renderHome` und `renderQuizDone`. Glas-Look (am Ende von `style.css`, nur bei `:root[data-mod]`): Flächen halbdurchsichtig mit feinem hellem Rand und schrägem Glanz (`--raise`, `--glass`, `--glass-line`), Karten `.note` als Glas in ihrer Farbe `--c` mit heller Schrift, Haupt- und Warn-Button sowie Etiketten als getöntes Glas. Außerdem als Glas: Modulleiste (aktives Modul als getöntes, leuchtendes Glas `.ind`), Blätter `dialog` (Lichtrand oben, Kopfzeile `.lv-head` als Milchglas beim Scrollen), Modul-Einträge mit weichem Farbverlauf `--ac` statt Streifen, Rückmeldung `.feedback` ganz in `--fb` getönt statt Streifen, Toast. Statt Konfetti Funkensprühen von den Seitenrändern: `confetti()` zeichnet in einen kurzlebigen Canvas `.sparks` Funken in den Modulfarben (schräg nach oben, Schwerkraft, leuchtende Schweife als Striche); die Abschussstelle wandert in 1,4 s am Rand von unten nach oben. Der Canvas wird danach entfernt. Sonst bewusst ohne `backdrop-filter` (Leistung am Handy). Quiz ohne ✕, ohne Häkchen-Zähler und ohne Weiter-Button: keine Kopfleiste; Neon-Fortschrittsbalken (Glasrinne, leuchtender Verlauf, Lichtpunkt vorne) in der Fußzeile; weiter per Tipp irgendwo auf dem Bildschirm (ein Klick-Handler auf `document`; ausgenommen Lautsprecher `[data-speak]`/`.speak`/`.hear-btn`, Links und offene Blätter; 350 ms Sperre fängt den Antwort-Tipp selbst ab) oder Enter/Leertaste (`#fbox` fokussierbar), beenden per Zurück oder Esc (`renderHome` stoppt dann das Mikrofon und speichert). Aufbau im Quiz (`body.qmode`, gesetzt von `qfxShow`, entfernt von `qfxOff`): die Seite scrollt nicht; Frage oben fest mit Abstand, Antworten/Eingabe/Rückmeldung scrollen in `.q-body` (oben und unten weich ausgeblendet, Scrollposition bleibt beim Neuaufbau derselben Frage erhalten, `qScroll`), unten die Fußzeile `.q-foot` (`qFoot`): nur der Neon-Fortschrittsbalken, fest ganz unten am Bildrand über die volle Breite (keine Kategorie-/Fragennummer-Anzeige mehr). Über dem Balken ein hoher (40 px), weich verlaufender Lichtschein (`.progress i::before`, nach oben und am Ende ausgeblendet). Ablauf nach der Antwort (`qReveal`, einmal pro Antwort über `a.shown`): richtige Antwort wird größer, übrige (außer der falsch gewählten) werden unsichtbar (`.gone`), dann schrumpft die richtige zurück und die unsichtbaren fallen auf Höhe 0 zusammen (`.gone.out`; bei Stimmt/Stimmt nicht nebeneinander nur unsichtbar, Platz bleibt), dann wird die Rückmeldung unsichtbar eingesetzt (`.fb-wait`, ohne eigene CSS-Einblendung), `.q-body` scrollt ganz nach unten und sie blendet ein. Die Rückmeldung zeigt keine Häkchen-Übersicht und kein „Neu abgehakt“ mehr (die Übersicht gibt es weiter im Nachschlagen); „Teil A/B geschafft“ bleibt. Unter der Frage 22 px Abstand. Zeitlimit: dünne Neon-Linie unter der Frage (`.q-timer`, Dauer `--tl`, im letzten Viertel rot, läuft auch bei reduzierter Bewegung). Satz bauen (`.bs-line` mit Neon-Unterlinie, gesetzte Wörter `.bs-w.set` ohne Rahmen; Wörter `.bs-w` als schwebende Neon-Rahmen, verbrauchte blass `.used`; `.bs-undo` klein rechts unter der Zeile). Buchstabenlücken: `.lg-word` mit weiter Laufweite, Lücken `.lg-g` als leuchtende Striche. Mehrfachauswahl (`multi-truefalse`, `.mt-list`): Aussagen schwebend wie Antworten mit Neon-Kästchen (`.mt-box`, angetippt leuchtend in `--accent` mit Häkchen), „Prüfen“ als Hauptknopf; danach jede Aussage grün (`.mt-ok`) bzw. rot ohne Durchstreichen (`.mt-bad`) mit „Stimmt / Stimmt nicht“ und Begründung (`.mt-v`), nichts verschwindet. Eingegebene Antwort im Vergleich (Teil B, `.typed`) schwebend wie die Antworten: Beschriftung klein, eigene Antwort grün bzw. rot durchgestrichen, richtige hell mit grünem Schein; KI-Fehlermeldung `.c-err` als rot getöntes Glas. `#qfx` fest oben und reicht bis knapp unter die Frage (`qfxFit`, `--qfx-h`); die Fäden selbst haben eine feste Höhe (`--qfx-t`, 420 px, Kacheln hängen am unteren Rand), eine längere Frage zeigt also oben mehr Fäden statt gestreckter Kurven (obere Hälfte der Kacheln gleichmäßig mit Fäden belegt, keine leere Zone); beim Fragenwechsel blendet `#qfx` kurz aus und wieder ein (`qfxSwapOut` in `nextQuestion`), damit der Bereichswechsel unsichtbar bleibt; im oberen Bereich zusätzliche, zartere Fäden und ein dritter Nebelschein, damit es sich nach oben auffächert. Bildschirmtastatur offen (Eingabefeld aktiv und sichtbare Höhe < 80 % der Ausgangshöhe, `kbdWatch`): `body.kbd` blendet die Fußzeile aus. Viewport mit `interactive-widget=resizes-content`, damit die Bildschirmtastatur die Höhe verkleinert und Eingabefelder sichtbar bleiben. Kopfzeile in Blättern `.lv-head` über die volle Breite, klebt bei `top:-20px` (Ausrichtung am Innenabstand) und bewegt sich nicht. Kalender blättert nur bis zum ersten Monat mit beantworteten Fragen zurück (`calFirstMonth`; Tage im Log ohne führende Null, daher als Datum vergleichen).
- Gekrönte Themen bekommen `.crown` mit `data-crown="<Kategorie>"` (Übersicht und Nachschlagen). Jede Kategorie hat ein eigenes Muster in `style.css` (`.crown[data-crown="code"]` usw., alles CSS-Verläufe, ein Lichtstreif läuft über alle) und Name + Symbol in `CROWN_DESIGNS`. **Neue Kategorie:** dort und in `style.css` ein eigenes Design ergänzen, sonst bekommt sie eines der 6 allgemeinen (`g0`–`g5`, nach Position im Modul). Designs nicht vorab zeigen, sie sind die Belohnung (erstmals sichtbar als `.crown-card` beim Verdienen).
- Texte auf Deutsch (Österreich: Lehrling, Gehsteig, Stiegenhaus, Krankenstand), Gendern mit `:in`.
- Fenster immer über `sheet(id)` + `openDialog(dlg)` öffnen, damit die Zurück-Taste funktioniert.
- Testen: lokal mit `python3 -m http.server` im Projektordner und Playwright; `file://` funktioniert wegen `fetch` nicht.

## Inhalte schreiben

Gilt für alle Module. Moduldateien nie komplett lesen: per Skript die nötigen Spalten auslesen, neue Inhalte in Blöcken von etwa 25 Begriffen schreiben und per Skript einfügen, kompakt zurückschreiben (`separators=(",",":")`, `ensure_ascii=False`). Danach das jeweilige Prüfskript laufen lassen und nur die geänderte `module.json` (+ ggf. `index.json`, diese Datei) ausliefern.

### Neue Begriffe

1. Vorhandene Begriffe der Kategorie per Skript auslesen (Index 1, 2, 3), damit Erklärungen zusammenpassen und sich nicht wiederholen.
2. Neue Einträge im vollen Format (Index 0–8, siehe „Ein Begriff“) an `raw` anhängen.
3. Hat das Modul eine abgestimmte Begriffsliste (`docs/<key>-begriffe.md`, für Agile `docs/agile-projekte-begriffe.md`): neue Begriffe dort zuerst mit dem Nutzer abstimmen, Bedeutung aus der Liste übernehmen.
4. `count` in `index.json` anpassen. Neue Begriffe brauchen auch Zusatzinhalte (nächster Abschnitt), sonst fällt Teil B für sie fast ganz weg.

Regeln: Erklärungen 1–3 ohne den englischen Begriff, Beispielsatz enthält ihn wörtlich (ohne „to “), deutscher Satz aus dem österreichischen Arbeitsalltag, Gendern mit `:in`. Die Größenregel für Kategorien (siehe „Größe der Kategorien“) muss danach weiter erfüllt sein.

**Prüfskript** (muss ohne Fehler laufen):
- Gültiges JSON; alle IDs im Modul eindeutig.
- Jeder Eintrag hat 8–9 Felder, Index 0 existiert in `cats`.
- Index 3, 6 und 7 enthalten den englischen Begriff nicht (Groß/Klein egal).
- Index 4 enthält den Begriff (ohne „to “).
- Index 8, falls vorhanden, besteht nur aus exakten Teilstrings von Index 5.
- Größenregel: jede Kategorie 30–50 Begriffe (Ausnahme siehe „Größe der Kategorien“); jede Kategorie aus `cats` hat Begriffe.

### Größe der Kategorien (verbindlich)

**Jede Kategorie hat 30–50 Begriffe.** Ausnahme: Ein Modul mit weniger als 30 Begriffen hat genau eine Kategorie.
Damit sind die Kategorien eines Moduls ungefähr gleich groß. Grund: Jedes Thema ist in vernünftiger Zeit zu meistern, die Krönchen bleiben vergleichbar.

- Wird eine Kategorie zu groß, wird sie geteilt: neue Kategorie mit eigenem Namen und Key, ein Teil behält den alten Key.
- Wird eine Kategorie zu klein, wird sie mit einer passenden zusammengelegt oder aufgefüllt.
- Kategorien dürfen dafür umbenannt werden (`name` in `cats`). Der **Key** bleibt nach Möglichkeit, denn an ihm hängen Krönchen (`P.crowns`), Themenauswahl (`P.cats`) und das Krönchen-Design. Der Lernstand der Begriffe (`P.terms`) hängt an der Begriffs-ID und bleibt immer erhalten.
- Neue Kategorie-Keys brauchen eine Farbe in `cats` und sollten ein eigenes Krönchen-Design bekommen (`CROWN_DESIGNS` + `style.css`, dann `VERSION` erhöhen).
- Wechselt ein Begriff die Kategorie, ändert sich nur Index 0; `extra` und die `conf`-Verweise bleiben gültig.

Beide Module erfüllen die Regel: IT 35 Kategorien mit 30–49 Begriffen (seit v17), Agile 13 mit 33–49.

### Zusatzinhalte (Feld `extra`)

Ziel: Begriffe in Teil B nicht an immer denselben Texten wiedererkennen, sondern anwenden und abgrenzen. Ablauf: per Skript die Begriffe der Kategorie auslesen (Index 1, 2, 3, 6, 7), Inhalte schreiben, per Skript als `extra[id]` eintragen.

```json
"extra":{
  "latency":{
   "ex":[["High latency made every video call stutter.","Durch die hohe Latenz hat jeder Videocall geruckelt."],["…","…"]],
   "sit":["Situation 1","Situation 2","Situation 3"],
   "conf":[["bandwidth","Latenz ist die Verzögerung pro Paket, Bandbreite die Datenmenge pro Sekunde."]],
   "tf":[[false,"Mehr Bandbreite senkt automatisch die Latenz.","Die Leitung kann breit und trotzdem langsam im Antworten sein."],[true,"…","…"]]
  }}
```
Schlüssel = Begriffs-ID wie in `buildTerms` (Kleinbuchstaben, Sonderzeichen → `-`, z. B. `World Café` → `world-caf-`).

- `ex`: genau 2 neue Satzpaare (englisch, deutsch). Englischer Satz enthält den Begriff wörtlich (ohne „to “), anders als der vorhandene Beispielsatz. Achtung: Die App prüft mit Wortgrenzen (`termRe`), Plural oder angehängte Endungen („tasks“, „user interviews“) zählen **nicht**, der Satz fällt dann still weg. Deutsch: österreichischer Arbeitsalltag.
- `sit`: genau 3 Situationen auf Deutsch, je 2–3 Sätze, aus dem österreichischen Arbeitsalltag (Lehrling, Kolleg:in, Kund:in, Daily, Krankenstand …). Enthalten **weder** den englischen Begriff **noch** die deutsche Übersetzung oder deren Wortstamm. Keine Frage am Ende (die App fragt „Welcher Begriff passt?“). Die Situation muss eindeutig sein, auch gegenüber naheliegenden Begriffen derselben Kategorie. Die drei Situationen zeigen verschiedene Blickwinkel (Ursache, Folge, Einsatz).
- `conf`: 1–2 Verwechslungspartner (ID muss **im selben Modul** existieren, darf aus anderer Kategorie sein) mit **einem** Satz zum Unterschied. Gibt es keinen sinnvollen Partner, leeres Array. Die App ersetzt im Satz beide Begriffe durch „A“ (Begriff selbst) und „B“ (Partner), daher: beide mit dem englischen Begriff oder dem deutschen Hauptwort aus Index 2 nennen (keine Umschreibungen), Begriff zuerst, und der Satz muss auch mit A/B ohne die Namen verständlich sein.
- `abbr` (optional, seit v47): `["API","Application Programming Interface"]` = [Abkürzung, Langform]. Nur, wenn der Begriff selbst eine gängige Abkürzung ist („API“) oder seine Langform („user interface“ → `["UI","user interface"]`); zusammengesetzte Begriffe nur, wenn die Abkürzung ihr Kern ist („DDoS attack“, „OSI model“). Abkürzungen und Langformen sind im Modul eindeutig (in Agile hat darum „Product Owner“ das PO, nicht „purchase order“). Langform von Abkürzungen in üblicher Schreibweise (meist groß), von Langform-Begriffen so wie der Begriff. IT 117, Agile 53.
- `rel` (optional, seit v47): `{"opp":[ids],"syn":[ids],"rel":[ids]}`, nur vorhandene Arten. `opp` = Gegenteil oder Gegenstück (client/server, upload/download), `syn` = bedeutet fast dasselbe (bug/defect), `rel` = hängt eng zusammen (branch/merge). In beide Richtungen eintragen (die App ergänzt die Gegenrichtung ohnehin), jedes Paar nur in einer Art. **Keine Paare, bei denen ein Begriff Teilwort des anderen ist** („log“/„log level“), die wären geschenkt. Lieber weniger und eindeutig: `rel` nur, wenn der Zusammenhang ohne Erklärung klar ist. IT 525 Paare (866 Begriffe), Agile 300 Paare (457 Begriffe); Begriffe ohne Beziehung bekommen die Frage einfach nicht.
- `tf`: genau 2 Aussagen auf Deutsch, eine wahr, eine falsch. Die falsche greift eine **typische Fehlvorstellung** auf, nicht etwas offensichtlich Absurdes. Begründung ein Satz. Hier darf der Begriff vorkommen.
- Gendern mit `:in`, österreichische Wörter, fachlich korrekt und passend zu den vorhandenen Erklärungen.

**Prüfskript** (muss ohne Fehler laufen; am sichersten mit `termRe`, `buildTerms`, `nameVariants` und `maskNames` direkt aus `app.js` in Node, weil die App mit Wortgrenzen und deklinierten Formen arbeitet): jeder Begriff der Kategorie hat einen Eintrag; `ex` = 2 Paare und englischer Satz enthält den Begriff; `sit` = 3 und keine enthält Begriff oder deutsche Übersetzung (ohne Artikel, Groß/Klein egal); `conf`-IDs existieren im Modul; `tf` = 2 mit genau einem `true`; `abbr` zwei verschiedene, nicht leere Texte und über das Modul eindeutig; `rel`-IDs existieren, nicht der Begriff selbst, kein Paar in zwei Arten, kein Teilwort-Paar; gültiges JSON.

**Begriffe streichen oder verschieben:** `extra[id]` mitnehmen bzw. löschen und per Skript alle `conf`-Einträge suchen, die auf die ID zeigen. Die bekommen einen neuen Partner mit neuem Satz oder werden gestrichen.

## Neues Modul anlegen

> **Für Claude:** Will der Nutzer ein neues Modul, zuerst diesen Abschnitt und „Inhalte schreiben“ lesen. Nichts schreiben, bevor Schritt 1 mit dem Nutzer geklärt ist.

1. **Mit dem Nutzer klären:** Fach und Zielgruppe (wer lernt, Vorwissen, bei Schulmodulen Schulstufe/Lehrplan), Sprachen (`lang`), Kategorien und **Begriffsliste** (Kategorie, Begriff, Bedeutung). Die abgestimmte Liste als `docs/<key>-begriffe.md` ablegen (Vorbild `docs/agile-projekte-begriffe.md`); sie gilt danach als verbindlich, Änderungen nur nach Rücksprache. Bei einem rein deutschsprachigen Modul zuerst „Deutschsprachige Module“ unten klären.
2. Ordner `modules/<key>/` mit `module.json` (Format siehe „Moduldatei“), `format`/`version` wie oben. Kein `levels`.
3. `cats` mit Pastellfarben `var(--n-…)` (siehe `style.css`), Kategorien nach „Größe der Kategorien“ zuschneiden. `lang` nur angeben, wenn die Sprachen von `en-US`/`de-AT` abweichen.
4. `theme` mit allen Feldern (`board`, `board-dot`, `ink`, `ink-soft`, `surface`, `line`, `ok`, `bad`, `accent`, `m1`, `m2`, `m3`) im Aufbau wie die anderen Module, gut unterscheidbar von Violett (IT) und Weinrot (Agile). `bad` muss sich deutlich von `accent` abheben, die Pastellkarten müssen auf `board` lesbar bleiben.
5. Inhalte nach „Inhalte schreiben“ in Blöcken pro Kategorie: erst `raw`, dann `extra`. Jeder Begriff braucht alles aus der Checkliste unten; nach jeder Kategorie beide Prüfskripte.
6. Eintrag in `modules/index.json` (Felder siehe „Katalog“): `ls` = `lernapp.progress.<key>`, `doc` = `progress-<key>`, `accent`/`board` wie im Theme, `desc`, `count`.
7. Optional eigene Krönchen-Designs pro Kategorie (`CROWN_DESIGNS` + `style.css`, siehe „Gestaltung“), sonst greifen die allgemeinen. Nur dann `VERSION` erhöhen.
8. Testen: Modul im Katalog hinzufügen, Quiz, Nachschlagen, Karteikarten (Playwright, siehe „Lernrahmen: Hintergrund und Entscheidungen“).

### Checkliste: was jeder Begriff braucht und wofür

| Inhalt | Feld | Wofür in der App | Worauf achten |
|---|---|---|---|
| Begriff | `raw[1]` | Teil A/B Antwort (auswählen, schreiben, sprechen), Vorlesen in `lang.term`, ID | eindeutig; Verben mit „to “; so schreiben, wie man ihn eintippt/spricht |
| Bedeutung | `raw[2]` | Teil A in beide Richtungen, Vorlesen in `lang.meaning`, `maskNames` | mit Artikel, Varianten mit „ / “, gegendert mit `:in`; kurz |
| 3 Erklärungen | `raw[3]`, `[6]`, `[7]` | Nachschlagen, Rückmeldung, Erklärung ↔ Begriff, **Musterlösungen der KI-Fragearten** | je ein präziser Satz, drei Blickwinkel (was, Beispiel/Einsatz, Zweck/Abgrenzung); genau genug, um den Begriff von verwandten zu unterscheiden; ohne den Begriff |
| Beispielsatz + Übersetzung | `raw[4]`, `[5]`, ggf. `[8]` | Lückensatz `c0`, Satz übersetzen, falscher Begriff im Satz, Karteikarten | `[4]` enthält den Begriff wörtlich in Grundform (Wortgrenzen!), sonst entfällt `c0` |
| 2 weitere Satzpaare | `extra.ex` | Lückensätze `c1`, `c2` | wie oben, anders als `[4]` |
| 3 Situationen | `extra.sit` | „Welcher Begriff passt?“ (lesen und hören), „Welche Situation passt?“ | ohne Begriff und Übersetzung, eindeutig, keine Frage am Ende |
| 2 Aussagen | `extra.tf` | „Stimmt das?“, „Mehrere Aussagen“ (dort auch als Aussage zu anderen Begriffen, darum möglichst den Begriff nennen) | eine wahr, eine typische Fehlvorstellung, je mit Begründung |
| 1–2 Unterschiede | `extra.conf` | „Unterschied“ mit A/B | Partner im selben Modul, beide beim Namen nennen; im Modul braucht es genug Paare (mind. 3 andere) |
| Abkürzung (optional) | `extra.abbr` | „Abkürzung“ in beide Richtungen, Nachschlagen | nur echte, gängige Abkürzungen; im Modul eindeutig; für abgewandelte falsche Antworten braucht es einige Abkürzungen im Modul |
| Beziehungen (optional) | `extra.rel` | „Gegenteil und Verwandte“, Nachschlagen | nur eindeutige Paare, keine Teilwort-Paare |

Was fehlt, wird nicht abgefragt, aber der Begriff verliert dann Übung: ohne `extra` bleibt von Teil B fast nichts. Die Kategorien brauchen genug Begriffe mit verschiedenen Anfangsbuchstaben für die 5 Antwortmöglichkeiten (mit 30–50 Begriffen pro Kategorie kein Problem).

### Deutschsprachige Module (z. B. Schulmodule): vor dem ersten klären

Der Rahmen ist dafür gedacht (`lang` beide `de-AT`), aber noch nie ausprobiert. Vor dem ersten solchen Modul mit dem Nutzer festlegen und ggf. den Code anpassen (`VERSION` erhöhen, Testseite nicht nötig):
- **Was ist die „Bedeutung“?** Vorschlag: eine kurze Umschreibung (z. B. Begriff „Fotosynthese“, Bedeutung „Pflanzen machen aus Licht, Wasser und CO₂ Zucker“). Sie muss kurz genug für Antwortmöglichkeiten sein und darf den Begriff nicht enthalten.
- **Artikel beim Begriff:** `checkTyped` ignoriert nur „to “, keine Artikel. Entweder Begriffe ohne Artikel in `raw[1]` (Artikel dann nur in Erklärungen) oder `typeNorm` um führende Artikel erweitern.
- **Beugung:** `termRe` und `maskNames` suchen die Grundform mit Wortgrenzen. Deutsche Sätze beugen oft („der Zellen“), dann fällt der Lückensatz weg. Sätze bewusst mit der Grundform schreiben oder `[8]`-artige Lücken auch für `raw[4]`/`ex` einführen.
- **Satzpaare:** `raw[4]`/`[5]` und `ex` sind als Übersetzungspaar gedacht. Vorschlag: `[4]` Satz mit dem Begriff, `[5]` derselbe Satz als Hilfe umschrieben ohne den Begriff (er erscheint bei „Satz zeigen“).
- **Ton und Alltag:** Situationen, Beispiele und Erklärungen aus dem Alltag der Zielgruppe (bei Kindern: Schule, Familie, Freizeit), Sprache passend zum Alter. `AI_RULES` prüft „Fachbegriffe“ inhaltlich streng; für Kinder evtl. eine mildere Anweisung pro Modul (dann `AI_RULES` modulabhängig machen und mit `tools/ki-test.html` neue Testfälle anlegen).

## Modulverwaltung: Verhalten im Detail

- Neues Gerät: Willkommen-Seite mit Katalog und „Importieren“ (Fortschritt von einem anderen Gerät übernehmen, die enthaltenen Module werden gewählt).
- Fehlt `lernapp.chosen` (alte Installation), werden alle Module mit vorhandenem Lernstand gewählt. Gewählte Keys, die nicht mehr im Katalog stehen, fallen still weg.
- Hinzufügen: Modul laden (ohne Netz Meldung), wählen, hinwechseln. Damit liegt es samt Zusatzinhalten offline vor.
- Entfernen: Rückfrage, Lernstand bleibt, Datei wird aus dem Daten-Cache gelöscht. Das letzte Modul kann nicht entfernt werden. Ist das Modul gerade offen, wird zuerst zum nächsten ladbaren gewechselt; geht das nicht (offline), wird nichts entfernt.
- Die Modulleiste ist auch bei nur einem Modul sichtbar (wegen ＋). Ab 4 Modulen: Auswahlknopf mit ＋ daneben, Auswahlmenü unten mit „Module verwalten“.
- Ist kein gewähltes Modul ladbar: Seite „Module nicht geladen“ mit „Nochmal versuchen“ und „Module verwalten“. Ein kaputtes Modul bleibt gewählt; beim Wechseln dorthin kommt eine Meldung, die übrigen laufen weiter.
- Service Worker: App-Cache `fach-vokabeln-<VERSION>` (wird bei jeder Version ersetzt) und Daten-Cache `fach-vokabeln-daten` (alles unter `modules/` außer `index.json`, übersteht App-Updates). Strategie: sofort aus dem Cache, im Hintergrund aktualisieren, Laden immer mit `cache:"no-cache"` wegen der 10-Minuten-Zwischenspeicherung von GitHub Pages.

## Lernrahmen: Hintergrund und Entscheidungen

Der Lernrahmen (v18–v21, in drei Chats L1–L3 umgesetzt) hat XP, Ränge, Punkte, Tagesbonus, Tagespflicht, Boxen/Profi/Meister, Meister-Regel, Pausen, Verwechslungen, Vormerkungen, Meisterrunde, Ränge-Fenster und Punkte-Erklärung ersetzt. Die Regeln stehen unter „Spielregeln“; hier nur, was beim Weiterbauen wichtig ist:
- **Warum so:** Begriffe sollen verstanden und angewendet werden, nicht an immer denselben Texten wiedererkannt. Die Bremse verhindert Abhaken aus dem Kurzzeitgedächtnis. Keine Strafen, damit Fehler nicht abschrecken.
- **Kein Übergang:** Der alte Lernstand wurde bewusst verworfen. Die `ls`-Schlüssel in `index.json` sind unverändert.
- **Begründete Abweichungen vom ursprünglichen Plan:** Schreiben und Sprechen in Teil A erst nach einer richtigen Antwort (sonst müsste man einen nie gesehenen Begriff sprechen); Teil A bleibt in genau 5 Antworten schaffbar. Antwortmöglichkeiten immer ganz sichtbar (das Anfangsbuchstaben-Spiel hing an den XP-Abzügen). Teil B ohne eigenes Minimum, es ergibt sich aus den Häkchen. Teil-C-Begriffe kommen nur einmal pro Runde. Die KI-Anfrage nutzt kein `responseSchema`, nur den JSON-Modus.
- **Tests** (Muster für künftige Änderungen, Playwright mit `python3 -m http.server`, `service_workers="block"`, Google Fonts blockieren): Stimmen (`speechSynthesis.getVoices`) und Spracherkennung (`SpeechRecognition` **und** `webkitSpeechRecognition`, Chromium hat beide) per Init-Skript nachbilden; Lernstand per Init-Skript in `localStorage` setzen; Bremse mit Lernstand von gestern bzw. `page.clock.install` testen; Gemini mit `context.route` auf `generativelanguage.googleapis.com` nachbilden (richtig, falsch, 429, 400 `API_KEY_INVALID`, kaputtes JSON, `route.abort`, 404 fürs Modell); offline mit `context.set_offline`. Erwartet: keine JS-Fehler (Meldungen zu absichtlich nachgebildeten HTTP-Fehlern und blockierten Schriften sind normal).
- **Vorlesen nachbilden:** `SpeechSynthesis.prototype.speak`/`getVoices` überschreiben (auf der Instanz greift es nicht) und `voice` an `SpeechSynthesisUtterance.prototype` mit leerem Setter belegen, sonst wirft die Zuweisung einer nachgebildeten Stimme und `speak` schweigt still. Gesprochene Antworten in Schleifen über `Q.spoken = {text, r:{ok:true}}` vor `answerInput`.
- **Stufen testen** (seit v40): Runden im Browser ohne Übergänge durchspielen (`autoFinish`, `planRound`, `findNext`/`goQuestion`/`renderQuiz` in einer Schleife, Antwort über `answer`/`answerInput`/`checkC`), Bremse durch Zurückdatieren aller `d` im Lernstand. Ohne Stimmen wartet die App 3 s, bevor Hören als unmöglich gilt (`VOICES`); Tests ohne Ton also erst danach starten.
- **Inhalte pro Begriff:** Bedeutung, 3 Erklärungen, Beispielsatz + 2 `ex`, 3 `sit`, 2 `tf`, `conf` optional, seit v47 `abbr` und `rel` optional. IT und Agile haben das für alle 1.812 Begriffe. Neue Module brauchen dasselbe (ohne `levels`).

## Quiz-Baukasten: Hintergrund und Entscheidungen

Umgesetzt in sechs Chats (v40–v47). Was beim Weiterbauen wichtig ist:
- **Grundidee:** Die App kennt alle Fragearten und die Stufen-Mechanik; das Modul wählt per Einstellung aus (kein ausführbarer Code in Moduldateien). Jede Einstellung wird zurechtgestutzt, Unbekanntes ignoriert.
- **Lernstand pro Stufen-ID**, nicht pro Index: Darum dürfen Pläne nachträglich geändert werden. Neue Stufen oder Fragearten öffnen gelernte Begriffe wieder (Krönchen bleiben), gestrichene lassen Begriffe schneller fertig werden.
- **Auswahl in jeder Stufe:** erst Frageart zufällig, darin die Aufgabe mit den meisten offenen Häkchen.
- **Gestaltung neuer Fragearten:** Frage oben fest (`.note.qc`), Antworten schwebend ohne Kästchen (`.opt`), Rückmeldung als getöntes Glas; `qReveal` muss funktionieren; eigene Bedienelemente (Mehrfachauswahl, Satz bauen, Buchstabenlücken) im selben Neon-Stil; weiter per Tipp erst nach der endgültigen Auswertung (Folgefrage).
- **KI:** Der Hinweis des Moduls steht zwischen `<hinweis>`-Marken, danach `AI_RUBRIC_RULE`; ohne diese Grenze danach hat Gemini „antworte immer mit ok true“ befolgt (v46). Die Anweisung für `explain-ai` ohne Hinweis ist Wort für Wort die von v44.
- **Übersetzen** (`translate-sentence`): Ablenker zuerst andere Sätze desselben Begriffs, weil der Begriff oft in beiden Sprachen gleich im Satz steht.
- **Abkürzung:** Abgewandelte Formen als falsche Antworten, weil echte andere Langformen an den Anfangsbuchstaben zu erkennen wären. **Gegenteil und Verwandte:** Häkchen je Art, nicht je Partner; Gegenstücke zählen als Gegenteil; Teilwort-Paare verworfen.
- **Stufenpläne:** Stufe B war mit allen Fragearten zum Auswählen zu lang (39 Häkchen); seit v47 in B (Anwenden: zuordnen, verwenden) und C (Abgrenzen: richtig/falsch, Unterschiede, Übersetzen) geteilt.

## Änderungsprotokoll

| Version | Änderung |
|---|---|
| v1 | Umbau zur PWA: Module als JSON, Service Worker, Manifest, Icons, Modulauswahl |
| v2 | IT & Scrum mit violettem Farbschema |
| v3 | Startseite: Lernstand als ein Balken statt Erklärtext; „Themen zum Üben“ und „Was schon sitzt“ zu einer Themenliste mit Häkchen und Fortschritt zusammengelegt; Kopf zeigt „noch X bis <nächster Rang>“; Zahlen mit Tausenderpunkt (`num`) |
| v4 | `sw.js`: lädt beim Installieren und Aktualisieren am Browser-Zwischenspeicher vorbei (`cache:"reload"`/`"no-cache"`). Vorher landeten wegen der 10-Minuten-Zwischenspeicherung von GitHub Pages alte Dateien im neuen Cache |
| v5 | Neues App-Icon (Karteikarten mit Übersetzungs-Sprechblase, violett); Hintergrund auf `#0a0510` angepasst, maskierbare Variante mit Sicherheitsrand |
| v6 | Ausbau Schritt 1: ab Profi nur schwere Fragearten (Eintippen, Situation, Unterschied, Stimmt das?, Lückensatz mit Zusatzsatz, Erklärung mit Verwechslungs-Ablenkern); Zusatzdateien `modules/extra/<modul>/<kategorie>.json` werden beim Quizstart geladen; Ablenker aus eigenen Fehlern (`P.mix`); Meister-Regel (`P.hard`); `tf` +3/−2; Hilfe-Fenster ergänzt |
| v7 | Spracheingabe beim Eintippen: 🎤-Knopf (Web Speech API, Englisch), wertet mehrere erkannte Varianten aus, zählt wie getippt; Fehlermeldungen für blockiertes Mikrofon/kein Netz; Hilfe ergänzt |
| v8 | Neue Gestaltung: ruhigere, runde Flächen, Schein der Modulfarbe, Farben blenden beim Modulwechsel über; Übersicht mit großer Quiz-Kachel und zwei halben Kacheln. Modulwechsel per Wischen auf der Übersicht (Marker in der Modulleiste wandert mit, Gummiband am Rand, einmaliger Hinweis), Modulleiste auch mit Pfeiltasten. Übergänge zwischen Bereichen und Fragen (View Transitions), 3D-Umdrehen und Wegfliegen der Karteikarten, Antwort-Animationen und Vibration, Fenster als Blatt von unten, Toast mit Ein-/Ausblenden. Andere Module werden im Hintergrund vorgeladen. `index.html` bekommt `#modbar` und `#pager` |
| v9 | Vibration entfernt (bei Antworten und beim Modulwechsel) |
| v10 | Gemeisterte Begriffe nicht mehr im Quiz; bei 1–2 offenen Begriffen Wiederholung bis 10 Fragen; Quiz endet, wenn der letzte offene Begriff gemeistert wird. Meisterrunde für gemeisterte Themen (20 s pro Begriff, kein Fehler erlaubt, ohne Einfluss auf den Lernstand), Krönung mit eigenem Design pro Thema (23 Themen-Designs + 6 allgemeine), Meisterbonus. Tagespflicht entfällt bei komplett gemeistertem Modul. Hilfe ergänzt |
| v11 | Meisterrunde: Rekord an richtigen Antworten und Zahl der Versuche unter dem Knopf; Uhr wird rot, wenn man hinter dem Plan (20 s pro Frage) liegt |
| v12 | Neues Modul **Agile & Projekte** (`agile`, weinrot, 13 Kategorien): 198 Begriffe aus `scrum`, `pm` und 2 aus `git` verschoben (nur Kategorie geändert); `team velocity`, `to do`, `in progress`, `done` gestrichen. IT-Modul heißt jetzt „IT“ (1.305 Begriffe, `key`/`ls` unverändert). 19 `conf`-Verweise in `modules/extra/dev/` auf verschobene Begriffe ersetzt bzw. gestrichen. Krönchen: `scrum` → `sprint`, `pm` → `plan`, 11 neue Designs |
| – | Schritt G für Agile abgeschlossen: 309 neue Begriffe in allen 13 Kategorien, Modul jetzt 507 Begriffe (nur `modules/agile.json`, keine `VERSION`-Erhöhung) |
| – | Schritt 2 für Agile: Zusatzinhalte für `agil`, `team`, `sprint`, `backlog`, `lean`, `produkt`, `discovery` (283 Begriffe, `modules/extra/agile/`, keine `VERSION`-Erhöhung) |
| – | Schritt 2 für Agile abgeschlossen: Zusatzinhalte für `orga`, `plan`, `anf`, `kosten`, `risiko`, `komm` (224 Begriffe), damit alle 507 Agile-Begriffe mit Zusatzinhalten (keine `VERSION`-Erhöhung) |
| v13 | **Modulsystem:** ein Ordner pro Modul (`modules/<key>/module.json`, `modules/<key>/extra/`), Moduldateien mit `format`/`version`; `index.json` ist der Katalog (`desc`, `count`, kein `file`). Nutzer wählt seine Module im neuen Katalog „Module verwalten“ (＋ in der Modulleiste und bei Export/Import), Auswahl in `lernapp.chosen`; bestehende Nutzer behalten alle Module mit Lernstand, neue Geräte starten mit dem Katalog. Nur gewählte Module werden geladen und offline gespeichert, beim Hinzufügen auch alle Zusatzdateien. Service Worker mit eigenem Daten-Cache, der App-Updates übersteht; beim Entfernen werden die Dateien gelöscht, der Lernstand bleibt. Keine Tagespflicht-Abzüge für die Zeit, in der ein Modul abgewählt war. Meldungen für fehlende, kaputte oder zu neue Module. Nach dem Update müssen gewählte Module einmal mit Internet geladen werden |
| v14 | **Vorübergehend:** Vorschau der Krönchen-Designs. Erste Kategorie von IT (`code`) und Agile (`agil`) wird auf Übersicht und Nachschlagen als gemeistert und gekrönt angezeigt (`PREVIEW_CROWN`/`preview` in `app.js`), nur Anzeige, Lernstand unverändert; Meisterrunde-Knopf zeigt nur einen Hinweis. Wird wieder entfernt |
| v15 | Vorschau aus v14 wieder entfernt, `app.js` wie in v13 |
| v16 | Ein Modul aus Katalog und Repo entfernt (inkl. Krönchen-Designs). **Zusatzdateien aufgelöst:** alle `modules/<key>/extra/*.json` stecken jetzt im Feld `extra` der `module.json` (1.305 + 507 Einträge, unverändert), ein Modul = eine Datei. `fetchExtras`/`loadExtras`/`preloadExtras` entfallen, Quiz und Meisterrunde starten ohne Warten. Service Worker räumt alte Einträge aus dem Daten-Cache |
| – | `CLAUDE.md` aufgeräumt: erledigte Ablaufpläne (Ausbau „Verstehen statt Auswendiglernen“, Umbau Agile, Modulsystem) durch die Abschnitte „Inhalte schreiben“, „Neues Modul anlegen“ und „Modulverwaltung“ ersetzt |
| – | Verbindliche Regel „Größe der Kategorien“: 30–50 Begriffe pro Kategorie (Module unter 30 Begriffen: eine Kategorie), Prüfskript ergänzt. IT als bekannte Abweichung, Aufteilung unter „Nächste Schritte“ eingereiht |
| v18 | **Lernrahmen L1:** XP, Ränge, Punkte, Tagesbonus, Tagespflicht, Boxen/Profi/Meister, Meisterrunde, Vormerkungen und Verwechslungen entfernt. Neuer Lernstand `P` v2 (alter Lernstand wird verworfen), Teil A mit Lesen/Hören und Auswählen/Schreiben/Sprechen, Auswahl der Fragen durch die App, Sprechen erst ins Textfeld, Schalter „Gerade kein Ton“, `lang` pro Modul, Kalender mit Fragen pro Tag, neue Startseite und Kopfzeile, Stand im Nachschlagen, Karteikarten ohne Vormerkung, Export v2, Hilfe neu. Teil B zeigt „kommt bald“ |
| v20 | Pro Frage nur eine Eingabeart (Schreiben ohne 🎤, Sprechen mit gesperrtem Feld bis zur Erkennung, Hinweis über dem Feld). Runde in neuer Kategorie hat 10 Fragen (so viele neue Begriffe wie nötig). Quiz-Karte dunkel im Modul-Schema mit wanderndem Farbschein, Kategorie als Punkt, Rand grün/rot nach der Antwort. Seitenwechsel blenden nur aus und ein statt zu gleiten. Hilfe angepasst |
| v19 | **Lernrahmen L2:** Teil B mit Lückensatz (nur Lesen; jeder Satz, jede Eingabeart), Situation (Lesen/Hören auf Deutsch, jede Eingabeart), Stimmt das? und Unterschied, gemischt abgefragt. Bremse: Teil B frühestens am Tag nach Teil A, Startseite sagt „Heute alles erledigt, morgen geht's weiter mit X Begriffen“. Häkchen von Teil B in Rückmeldung und Nachschlagen, Rundenende mit „Teil B geschafft“, Hilfe ergänzt. Teil C zeigt „kommt bald“ |
| v17 | **IT-Kategorien aufgeteilt:** aus 14 werden 35 Kategorien mit 30–49 Begriffen (nur Index 0 der Begriffe geändert, `extra` unverändert). Die alten Keys bleiben beim Teil, zu dem ihr Krönchen passt, und haben teils neue Namen; 21 neue Kategorien mit eigenen Krönchen-Designs. Neuer Speicherschlüssel `lernapp.progress.dev` (`doc` `progress-dev`): IT startet auf Wunsch des Nutzers bei null, Agile unberührt |
| v21 | **Lernrahmen L3:** Teil C: Begriff in eigenen Worten erklären (schreiben oder diktieren), Google Gemini prüft mit eigenem Schlüssel (Blatt „KI-Prüfung“, Schlüssel nur in `lernapp.aikey`). Bremse B → C, höchstens 2 Teil-C-Fragen pro Runde, Fehlerfälle ohne Wertung, Hinweis auf der Übersicht, wenn Begriffe auf die KI-Prüfung warten. Begriff gelernt, Kategorie gemeistert → Krönchen. Hilfe und Nachschlagen angepasst |
| – | `CLAUDE.md` an den Lernrahmen angepasst: „Was die App ist“, „Spielregeln“ (jetzt der Lernrahmen samt KI-Prüfung), „Code-Landkarte“, „Gespeicherter Fortschritt“, „Datenformat“ (`lang`, `levels` bedeutungslos), „Gestaltung“, „Inhalte schreiben“ und „Neues Modul anlegen“ neu; Abschnitt „Vorhaben ‚Lernrahmen‘“ samt Umsetzungsnotizen L1–L3 zu „Lernrahmen: Hintergrund und Entscheidungen“ gekürzt (keine `VERSION`-Erhöhung) |
| – | Neue Testseite `tools/ki-test.html` für die KI-Prüfung mit echtem Schlüssel (16 Testfälle, eigene Fälle, Ergebnis zum Kopieren). `levels` per Skript aus `modules/dev/module.json` und `modules/agile/module.json` entfernt, sonst unverändert (keine `VERSION`-Erhöhung) |
| – | KI-Prüfung mit echtem Schlüssel getestet: alle 16 Testfälle wie erwartet. „Neues Modul anlegen“ ausgebaut: Ablauf ab der Abstimmung mit dem Nutzer, Checkliste „was jeder Begriff braucht und wofür“, offene Punkte für deutschsprachige Module (keine `VERSION`-Erhöhung) |
| v22 | Quiz-Karte: statt des wandernden Farbscheins graue Wellen im Hintergrund und unten eine Welle in der Modulfarbe (nur `style.css`) |
| v23 | Quiz-Karte nach Vorbild FIFA 10 (Teamauswahl): Band aus sich kreuzenden, langsam wandernden Lichtfäden in Silber und Modulfarbe mit Farbnebel statt der Wellen aus v22 (nur `style.css`) |
| v24 | Quiz-Karte schwebt frei (keine Fläche, kein Rand), Lichtfäden blenden links und rechts weich aus. Nach der Antwort kurzer Schub der Fäden und Übergang der Akzentfarbe nach Grün bzw. Rot. Fäden laufen beim Neuaufbau der Karte nahtlos weiter (`qcDelay`, `qcBurst` in `app.js`) |
| v25 | Lichtfäden als eigenes Element `#qfx` vom Seitenanfang bis unter die Frage; bleiben beim Fragenwechsel stehen, Farbe wechselt per Übergang zu Grün/Rot und wieder zurück, Schub ohne Zurückspringen (`qfxEl`, `qfxFit`, `qfxShow`, `qfxOff` in `app.js`) |
| v26 | Lichtfäden mit fester Höhe (300 px, `--qfx-h`) statt bis unter die Frage (`qfxFit` entfernt); im Normalzustand durchsichtiger (`--qfx-o`), bei richtig/falsch volle Stärke |
| v27 | Lichtfäden als Hintergrund der ganzen App (fest, ganzer Bildschirm, per `transform`); Antworten im Quiz frei schwebend ohne Fläche, nach der Antwort leuchten Fäden hinter richtig (grün) und falsch (rot) auf |
| v28 | Lichtfäden als ein durchgehendes Geflecht statt drei Bündeln, halb so deckend. Hinter richtiger/falscher Antwort färben sich jetzt die Hintergrundfäden selbst (`.qfx-hl`, `qfxTrack`, folgt beim Scrollen) statt eigener Fäden |
| v29 | Lichtfäden wieder nur hinter der Frage (300 px, nur im Quiz), sparsam per `transform`, halbe Deckkraft; Antworten schwebend mit grünem/rotem Schein statt gefärbter Hintergrundfäden. Neuer Glas-Look für alle Flächen und Karten (ohne `backdrop-filter`) |
| v30 | Glas-Look auch für Modulleiste, Blätter (Module verwalten u. a.), Modul-Einträge, Richtig/Falsch-Rückmeldung und Toast; Konfetti als Glassplitter und Lichtfunken in den Modulfarben |
| v31 | Quiz: ✕, Häkchen-Zähler und Weiter-Button entfernt (Tipp/Enter weiter, Zurück/Esc beendet und speichert), Kategorie/Fragennummer als feste Fußzeile, Fortschrittsbalken im Neon-Look. Kalender blättert nur bis zum ersten Monat mit Fragen zurück. Blatt-Kopfzeile über die volle Breite und ohne Mitwandern |
| v32 | Quiz: Frage steht fest oben, nur Antworten und Rückmeldung scrollen (`body.qmode`, `.q-body`); Fortschrittsbalken in die Fußzeile unter die Glas-Pille; Lichtfäden auf 210 px, damit sie hinter der Frage liegen; Viewport `interactive-widget=resizes-content` (`index.html`) |
| v33 | Quiz: Pille und Balken verschwinden, solange die Bildschirmtastatur offen ist (`kbdWatch`, `body.kbd`); Lichtfäden und Nebel fächern sich mit zusätzlichen Fäden nach oben auf |
| v34 | Funkensprühen von den Seitenrändern statt Glassplitter-Konfetti (Canvas); Fortschrittsbalken ganz unten über die volle Breite; mehr Abstand unter der Frage; „Deine Antwort / Richtig“ schwebend statt Kasten; KI-Fehlermeldung als Glas |
| v35 | Quiz: Häkchen-Übersicht und „Neu abgehakt“ aus der Rückmeldung entfernt; Glas-Pille unten entfernt, nur noch der Fortschrittsbalken |
| v36 | Quiz: nach der Antwort führt ein Tipp irgendwo auf dem Bildschirm weiter (außer auf Lautsprecher), statt nur auf Frage, Antworten und Rückmeldung |
| v37 | Quiz: Ablauf nach der Antwort (richtige wächst, übrige verschwinden ganz, Rückmeldung blendet nach Scrollen ein); jeder Begriff nur einmal pro Runde (`planRound`, Runde füllt mit neuen Begriffen auf); Lichtschein über dem Balken; Funken von unten nach oben; Fadenbereich wieder an der Frage, Fäden mit fester Höhe und kurzem Ausblenden beim Wechsel |
| v38 | Fäden über langen Fragen gleichmäßig ohne leere Zone; Rückmeldung flackert nicht mehr (eigene Einblend-Animation aus); Stimmt/Stimmt nicht springt nicht mehr in die andere Spalte; Lichtschein über dem Balken größer und weich auslaufend |
| v39 | Moduleinstellung `quiz.parts` (IT ohne Teil A, neue Begriffe starten in Teil B); Stufen im Gleichschritt: gefragt wird nur die niedrigste Ebene der angehakten Themen, am längsten nicht gefragte zuerst; Quiz-Kachel zeigt den aktuellen Teil; Hilfe mit Abschnitt „Alle Begriffe im Gleichschritt“ |
| v40 | **Quiz-Baukasten, Chat 1 (Fundament):** Fragearten als Registry (`KINDS`), Stufen aus `quiz.stages` des Moduls (Häkchen, `minCorrect` pro Stufe und Frageart, `waitDays`, `perRound`, Gleichschritt ein/aus, `round`, `options`, `typing`), Lernstand v3 pro Stufen-ID (alter Lernstand wird verworfen, Export v3), `MOD_VERSION` 2. IT (`anwenden`, `erklaeren`) und Agile (`bedeutung`, `anwenden`, `erklaeren`) mit Stufenplan wie bisher und `version: 2`. `modules/index.json` bekommt bewusst keine `version`, damit alte App-Versionen beim ersten Start nach dem Update noch das gecachte Modul laden. Oberfläche und Hilfe vorerst wie bisher (Teil A/B/C), Umbau in Chat 2 |
| v41 | **Quiz-Baukasten, Chat 2 (Oberfläche):** „Teil A/B/C“ heißt überall „Stufe <Buchstabe> · <Name>“; Farben für bis zu 6 Stufen (`--st`); Quiz-Kachel „Gerade dran“ auch ohne Gleichschritt; Nachschlagen mit einer Zeile pro Stufe, fehlenden Mindestzahlen und Sortierung nach Anteil der Häkchen; Rückmeldung und Rundenende „Stufe … geschafft“; Hilfe aus dem Stufenplan erzeugt (Fragearten mit `help`/`each`, neues Feld `quiz.help`, bei IT gesetzt); Krönchen-Prüfung für alle Themen in `autoFinish`; Karteikarten über `quiz.flashcards` abschaltbar; KI-Texte ohne „Teil C“ |
| v45 | **Quiz-Baukasten, Chat 5 (KI-Fragearten):** neue Fragearten `own-sentence` (Eigener Satz, Sprache über `language`, Standard Deutsch mit englischem Begriff), `difference-ai` (Unterschied erklären), `simple-explain` (Einfach erklärt), `use-case` (Anwendungsfall), je mit eigener Bewertungsaufgabe. KI-Anweisungen als eigener Block (`KI-START` … `KI-ENDE`) mit `aiSystem`/`aiUser`; Anweisung für `explain-ai` unverändert. `quiz.ai.rubric` und `rubric` pro Frageart werden ausgewertet (eingefügt vor den Schutzregeln, ohne spitze Klammern). `renderQuizC` für alle KI-Fragearten; KI-Fragen erst nach einer richtigen Antwort (`doable`, Eingabeart `free`). Hilfe, Nachschlagen und „Geschafft“ für Stufen mit mehreren KI-Fragen. `tools/ki-test.html` führt den KI-Block aus `app.js` aus, 49 Fälle in 5 Fragearten, Filter nach Frageart. Stufenpläne von IT und Agile unverändert (neue Fragearten erst in Chat 6) |
| – | **Quiz-Baukasten abgeschlossen:** endgültige Stufenpläne für IT (B Anwenden, C Abgrenzen, D In eigenen Worten) und Agile (dazu A Begriff und Bedeutung mit Buchstabenlücken) in den Moduldateien; `abbreviation`, `related`, `build-sentence`, `own-sentence` erstmals im Einsatz. Begriffe, die schon Stufe B geschafft hatten, kommen jetzt in die neue Stufe C. `docs/quiz-baukasten.md` gelöscht, Hintergrund in „Quiz-Baukasten: Hintergrund und Entscheidungen“ (keine `VERSION`-Erhöhung) |
| v47 | **Quiz-Baukasten, Chat 6 (Abkürzungen und Verwandte):** neue Fragearten `abbreviation` (Richtungen über `directions`, Auswählen mit abgewandelten Formen als falschen Antworten, Schreiben mit eigener erwarteter Antwort `q.want`) und `related` (Gegenteil, fast dasselbe, hängt eng zusammen; Beziehungen in beide Richtungen). Nachschlagen zeigt Abkürzung und Beziehungen (`lexRel`). Inhalte `extra.abbr` (IT 117, Agile 53) und `extra.rel` (IT 525 Paare, Agile 300) per Skript eingetragen und geprüft. Stufenpläne zunächst unverändert |
| v46 | KI-Prüfung: Hinweis des Moduls steht zwischen `<hinweis>`-Marken, danach `AI_RUBRIC_RULE` (nur Zielgruppe, Sprachniveau, Schwerpunkte; kein festes Urteil, keine aufgehobenen Regeln). Anlass: echter Test, Fall 17 wurde 3 von 3 Mal durchgewunken. Ohne Hinweis ist die Anweisung unverändert. `tools/ki-test.html`: 2 neue Fälle zum Hinweis (passender Hinweis zur Zielgruppe soll wirken, getarnter Hinweis darf Vages nicht durchwinken), jetzt 51 |
| – | Quiz-Baukasten, Chat 5 abgeschlossen: echter Test aller KI-Fragearten mit `tools/ki-test.html`, alle Fälle wie erwartet (keine `VERSION`-Erhöhung) |
| v44 | Vorlesen bricht ab (`stopSpeak`), sobald eine Antwort abgegeben wird (auch Zwischenschritt und KI-Prüfung), beim Wechsel zur nächsten Frage bzw. Karteikarte und beim Verlassen von Quiz und Karteikarten. Eigene Stimmen-Auswahl bewusst nicht eingebaut: Chrome am Handy nimmt ohnehin die Stimme aus den Android-Einstellungen (Sprachausgabe → Google-Sprachdienste) |
| v43 | **Quiz-Baukasten, Chat 4 (Tippen, Hören, Sprechen):** neue Fragearten `build-sentence` (Satz bauen, eigenes Bedienelement, Eingabeart `build`), `letter-gaps` (Buchstabenlücken), `dictation` (Diktat), `pronounce` (Nachsprechen, `sayOnly`); Variante `timeLimit` (Neon-Linie unter der Frage, abgelaufen = wie falsch, auch beim Schreiben und Sprechen, nicht bei KI); Hilfe mit „Zeit“ und Abschnitt „Zeitlimit“. Stufenpläne von IT und Agile unverändert (neue Fragearten erst in Chat 6) |
| – | Aufgeräumt: Die endgültigen Moduldateien waren versehentlich in `module/` statt `modules/` hochgeladen (die App lud weiter den alten Stand ohne Stufe C, `abbr` und `rel`); jetzt in `modules/`, `module/` und `docs/quiz-baukasten.md` gelöscht. `README.md`: Moduldateien mit `"version":2`. Kopf von `docs/agile-projekte-begriffe.md` aktualisiert (nicht mehr „Entwurf“, Liste entspricht dem Modul) (keine `VERSION`-Erhöhung) |
| – | **Neuer Stufenplan für IT** (vom Nutzer mit `tools/quiz-einstellungen.html` zusammengeklickt): sechs Stufen `level_1` … `level_6` (A–F) statt `anwenden`/`abgrenzen`/`erklaeren`, damit beginnt der IT-Lernstand neu; alle `waitDays` 0, `typing.typosPer` 5, neu im Einsatz `pronounce`, `difference-ai`, `simple-explain`, `use-case`. Die ID der fünften Stufe hieß im Entwurf `leve_5` und wurde vor dem ersten Einsatz zu `level_5` korrigiert (keine `VERSION`-Erhöhung) |
| – | Neue Seite `tools/quiz-einstellungen.html`: Stufen, Fragearten und alle Einstellungen eines Moduls zusammenklicken, prüfen, als `module.json` herunterladen oder für Claude kopieren (keine `VERSION`-Erhöhung) |
| v42 | **Quiz-Baukasten, Chat 3 (Fragearten zum Auswählen):** neue Fragearten `explain-to-term`, `term-to-explain`, `which-situation`, `translate-sentence` (Richtungen über `directions`, Ablenker auch andere Sätze desselben Begriffs), `wrong-term` (Passt/Passt nicht mit Folgefrage), `multi-truefalse` (Mehrfachauswahl, eigenes Bedienelement); alle in Stufe B von IT und Agile (`module.json`, B jetzt meist 39 Häkchen). Lückensatz behält „Satz auf Deutsch zeigen“. Frageart-Felder `outKey`, `outLabel`, `pick`, `controls`/`wire`, `tag`, `help(kc)`; Variante `options` getestet |
