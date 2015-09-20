import urllib2
import urllib
import json
import pdb
import sys
import base64
import getpass


def main(argv):
    user = raw_input("Username: ")
    password = getpass.getpass()

    auth = 'Basic ' + base64.b64encode(user + ':' + password)
    print auth

    request_headers = {
        "Authorization": auth,
        "Content-Type": "application/json",
    }

    dates = [
        '2015/01/01',
        '2015/02/01',
        '2015/03/01',
        '2015/04/01',
        '2015/05/01',
        '2015/06/01',
        '2015/07/01',
        '2015/08/01',
        '2015/09/01',
        '2015/10/01',
        ]

    totals = []
    i = 0

    while i < len(dates) - 1:
        query = 'project=EMBXP AND issuetype in ("Change Request", "Functional requirement", "Non-functional requirement") AND status in ("Ready for Production", "Ready for UAT", "In UAT") and created >= "' + dates[i] + '" and created <= "' + dates[i + 1] + '" ORDER BY status DESC'
        encodedQuery = urllib.quote_plus(query)
        url = 'https://projects.netcentric.biz/rest/api/2/search?jql=' + encodedQuery
        request = urllib2.Request(url, headers=request_headers)
        contents = urllib2.urlopen(request).read()
        data = json.loads(contents)
        totals.append(data['total'])
        i = i + 1
        print data['total']

    print totals

if __name__ == "__main__":
    main(sys.argv)
