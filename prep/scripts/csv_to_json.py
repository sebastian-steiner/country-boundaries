import sys
import csv
import json

def main(infile, outfile):
    with open(infile, mode="r", encoding="utf-8") as csvfile:
        data = list(csv.DictReader(csvfile, delimiter=";"))
    with open(outfile, mode="w", encoding="utf-8") as jsonfile:
        json.dump(data, jsonfile, indent=2)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("provide in and out files")
        exit(1)
    main(sys.argv[1], sys.argv[2])