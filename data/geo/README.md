# Map boundaries

Shapes used by `map.html` to shade countries, states/provinces and the South
Gujarat districts of origin. Simplified for the web; built by the private
repo's `tools/build_map_boundaries.sh`.

| File | Source | Licence |
|---|---|---|
| `countries.json` | [Natural Earth](https://www.naturalearthdata.com/) 1:50m Admin 0 – Countries | Public domain |
| `admin1/<CC>.json` | Natural Earth 1:10m Admin 1 – States, Provinces (UK councils merged into regions) | Public domain |
| `districts_south_gujarat.json` | [geoBoundaries](https://www.geoboundaries.org/) gbOpen IND ADM2 (2021), from Pathways Data Pvt. Ltd. / lgdirectory.gov.in | [Open Data Commons Open Database License 1.0](https://opendatacommons.org/licenses/odbl/1-0/) |

`districts_south_gujarat.json` is a derived database of the geoBoundaries data
and is made available under the ODbL 1.0, the same licence as the original.
The map credits geoBoundaries in its attribution line.
