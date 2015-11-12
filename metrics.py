import urllib2
import urllib
import json
import pdb
import sys
import base64
import getpass
import os
from subprocess import call
from views.areaChart import AreaChart


def main(argv):
    user = raw_input("Username: ")
    password = getpass.getpass()

    auth = 'Basic ' + base64.b64encode(user + ':' + password)
    print auth

    request_headers = {
        "Authorization": auth,
        "Content-Type": "application/json",
    }

    f = open('config.json', 'r')
    config = json.loads(f.read())

    result = {}

    for view in config['views']:
        result[view['id']] = AreaChart(config, view, request_headers).createJSON()

    f = open('html/js/result.js', 'w')
    f.write('window.data = ' + json.dumps(result) + ';')
    f.write('\n')
    f.write('window.sprints = ' + json.dumps(config['sprints']) + ';')
    f.close()

    path = os.path.dirname(os.path.abspath(__file__)) + '/html/index.html'
    call(["/usr/bin/open", "-a", "/Applications/Google Chrome.app", path])

if __name__ == "__main__":
    main(sys.argv)
