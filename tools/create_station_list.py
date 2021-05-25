#!/usr/bin/env python3

# ./create_station_list.py station_codes.csv ../stations.js

import csv
import json
import sys

if __name__ == '__main__':
    if len(sys.argv) < 3:
        sys.exit('usage: create_station_list.py <input> <output>')

    infile = sys.argv[1]
    outfile = sys.argv[2]

    stations = []
    with open(infile) as csvfile:
        reader = csv.reader(csvfile)
        for row in list(reader)[1:]:
            stations.append({'name': row[0], 'crs': row[1]})
            if row[2]:
                stations.append({'name': row[2], 'crs': row[3]})
            if row[4]:
                stations.append({'name': row[4], 'crs': row[5]})
            if row[6]:
                stations.append({'name': row[6], 'crs': row[7]})

        output = 'export const station_list = %s;' % json.dumps(stations)
        with open(outfile, 'w') as fp:
            fp.write(output)
            fp.close()