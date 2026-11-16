# H5PEditor.CorrectErrorsMarkerLabel

*Eesti keeles · [English](#english)*

Sisutüübi [H5P.CorrectErrors](https://github.com/urmasv/H5P.CorrectErrors) („Paranda tekst“) redaktori abiteek. Ei ole iseseisvalt käivitatav (`runnable: 0`).

**Näidisfailid:** https://urmasvessin.ee/testid/h5p/h5p-sisutuup-correct-errors-paranda-tekst/

## Mida see teeb

- Muudab hindamisviisi valiku „Markerite [ ] vaheline osa“ teksti vastavalt valitud markerile (`[ ]`, `{ }`, `# #`, `@ @`, `* *`).
- Näitab välja „Kuva hinnatav osa helesinise taustaga“ ainult siis, kui hindamisviisiks on valitud märgitud osad.

## Sõltuvus

Kasutatakse `H5P.CorrectErrors` `library.json` → `editorDependencies` kaudu.

Hoidla juur on teegi juur, ehitamist pole vaja.

## Litsents

MIT, vt [LICENSE](LICENSE).

## Autor

UrmasV

---

<a id="english"></a>

# H5PEditor.CorrectErrorsMarkerLabel (English)

*[Eesti keeles](#h5peditorcorrecterrorsmarkerlabel) · English*

Editor helper library for the content type [H5P.CorrectErrors](https://github.com/urmasv/H5P.CorrectErrors) ("Correct Errors"). It is not runnable on its own (`runnable: 0`).

**Sample files:** https://urmasvessin.ee/testid/h5p/h5p-sisutuup-correct-errors-paranda-tekst/

## What it does

- Updates the label of the scoring mode option "Content between markers [ ]" to match the selected marker (`[ ]`, `{ }`, `# #`, `@ @`, `* *`).
- Shows the field "Show evaluated parts with a light blue background" only when the scoring mode is set to marked parts.

## Dependency

Used through `H5P.CorrectErrors` `library.json` → `editorDependencies`.

The repository root is the library root; no build step is needed.

## License

MIT, see [LICENSE](LICENSE).

## Author

UrmasV
