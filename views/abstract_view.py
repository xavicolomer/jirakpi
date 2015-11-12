import urllib2
import urllib
import json


class AbstractView(object):
    def __init__(self, config, view, auth):
        self.config = config
        print 'Abstract View'

    def createJSON(self):
        print 'Overwrite this method'

    def apiCall(self, query, auth):
        encodedQuery = urllib.quote_plus(query)
        url = self.config['url'] + 'search?jql=' + encodedQuery
        request = urllib2.Request(url, headers=auth)
        contents = urllib2.urlopen(request).read()
        data = json.loads(contents)
        return data

