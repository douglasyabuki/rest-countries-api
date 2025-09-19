import time
import json
import requests
from pathlib import Path

COUNTRY_CODES=[
    "AFG",
    "ALA",
    "ALB",
    "DZA",
    "ASM",
    "AND",
    "AGO",
    "AIA",
    "ATA",
    "ATG",
    "ARG",
    "ARM",
    "ABW",
    "AUS",
    "AUT",
    "AZE",
    "BHS",
    "BHR",
    "BGD",
    "BRB",
    "BLR",
    "BEL",
    "BLZ",
    "BEN",
    "BMU",
    "BTN",
    "BOL",
    "BES",
    "BIH",
    "BWA",
    "BVT",
    "BRA",
    "IOT",
    "VGB",
    "BRN",
    "BGR",
    "BFA",
    "BDI",
    "KHM",
    "CMR",
    "CAN",
    "CPV",
    "CYM",
    "CAF",
    "TCD",
    "CHL",
    "CHN",
    "CXR",
    "CCK",
    "COL",
    "COM",
    "COG",
    "COD",
    "COK",
    "CRI",
    "HRV",
    "CUB",
    "CUW",
    "CYP",
    "CZE",
    "DNK",
    "DJI",
    "DMA",
    "DOM",
    "ECU",
    "EGY",
    "SLV",
    "GNQ",
    "ERI",
    "EST",
    "ETH",
    "FLK",
    "FRO",
    "FJI",
    "FIN",
    "FRA",
    "GUF",
    "PYF",
    "ATF",
    "GAB",
    "GMB",
    "GEO",
    "DEU",
    "GHA",
    "GIB",
    "GRC",
    "GRL",
    "GRD",
    "GLP",
    "GUM",
    "GTM",
    "GGY",
    "GIN",
    "GNB",
    "GUY",
    "HTI",
    "HMD",
    "VAT",
    "HND",
    "HKG",
    "HUN",
    "ISL",
    "IND",
    "IDN",
    "CIV",
    "IRN",
    "IRQ",
    "IRL",
    "IMN",
    "ISR",
    "ITA",
    "JAM",
    "JPN",
    "JEY",
    "JOR",
    "KAZ",
    "KEN",
    "KIR",
    "KWT",
    "KGZ",
    "LAO",
    "LVA",
    "LBN",
    "LSO",
    "LBR",
    "LBY",
    "LIE",
    "LTU",
    "LUX",
    "MAC",
    "MKD",
    "MDG",
    "MWI",
    "MYS",
    "MDV",
    "MLI",
    "MLT",
    "MHL",
    "MTQ",
    "MRT",
    "MUS",
    "MYT",
    "MEX",
    "FSM",
    "MDA",
    "MCO",
    "MNG",
    "MNE",
    "MSR",
    "MAR",
    "MOZ",
    "MMR",
    "NAM",
    "NRU",
    "NPL",
    "NLD",
    "NCL",
    "NZL",
    "NIC",
    "NER",
    "NGA",
    "NIU",
    "NFK",
    "PRK",
    "MNP",
    "NOR",
    "OMN",
    "PAK",
    "PLW",
    "PSE",
    "PAN",
    "PNG",
    "PRY",
    "PER",
    "PHL",
    "PCN",
    "POL",
    "PRT",
    "PRI",
    "QAT",
    "KOS",
    "REU",
    "ROU",
    "RUS",
    "RWA",
    "BLM",
    "SHN",
    "KNA",
    "LCA",
    "MAF",
    "SPM",
    "VCT",
    "WSM",
    "SMR",
    "STP",
    "SAU",
    "SEN",
    "SRB",
    "SYC",
    "SLE",
    "SGP",
    "SXM",
    "SVK",
    "SVN",
    "SLB",
    "SOM",
    "ZAF",
    "SGS",
    "KOR",
    "SSD",
    "ESP",
    "LKA",
    "SDN",
    "SUR",
    "SJM",
    "SWZ",
    "SWE",
    "CHE",
    "SYR",
    "TWN",
    "TJK",
    "TZA",
    "THA",
    "TLS",
    "TGO",
    "TKL",
    "TON",
    "TTO",
    "TUN",
    "TUR",
    "TKM",
    "TCA",
    "TUV",
    "UGA",
    "UKR",
    "ARE",
    "GBR",
    "USA",
    "UMI",
    "VIR",
    "URY",
    "UZB",
    "VUT",
    "VEN",
    "VNM",
    "WLF",
    "ESH",
    "YEM",
    "ZMB",
    "ZWE"
]
BASE_URL="https://restcountries.com/v3.1/alpha/"

def fetch_and_save():
    """
    Makes one request per second to base_url + string.
    Appends each JSON response to data.json at the repo root.
    """
    data_file = Path("../src/app/api/v3/countries/data.json")

 # Load existing data or start empty
    if data_file.exists():
        with data_file.open("r", encoding="utf-8") as f:
            try:
                all_data = json.load(f)
            except json.JSONDecodeError:
                all_data = []
    else:
        all_data = []

    total = len(COUNTRY_CODES)

    for idx, country_code in enumerate(COUNTRY_CODES, start = 1):
        remaining = total - idx + 1
        url = f"{BASE_URL}{country_code}"
        print(f"{remaining} requests left. Fetching data for country_code {country_code}")
        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            arr = response.json()
            if not arr or not isinstance(arr, list):
                print(f"Unexpected response for {url}")
                continue
            item = arr[0]  # first element of array
            name_common = item.get("name", {}).get("common")
            if not name_common:
                print(f"No name.common for {url}")
                continue

            # replace if same name.common exists
            updated = False
            for i, existing in enumerate(all_data):
                if existing.get("name", {}).get("common") == name_common:
                    all_data[i] = item
                    updated = True
                    break
            if not updated:
                all_data.append(item)

        except Exception as e:
            print(f"Request failed for {url}: {e}")
        time.sleep(1)

    with data_file.open("w", encoding="utf-8") as f:
        json.dump(all_data, f, indent=2)

fetch_and_save()