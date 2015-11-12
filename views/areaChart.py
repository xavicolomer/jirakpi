from abstract_view import AbstractView
import pdb


class AreaChart(AbstractView):
    def __init__(self, config, view, auth):
        super(AreaChart, self).__init__(config, view, auth)
        self.config = config
        self.view = view
        self.auth = auth

    def createJSON(self):
        if 'sprints' not in self.config:
            print 'incorrect configuration'

        view = self.view
        results = []
        views = []

        print 'Calculating... ' + view['title']

        for query in view['queries']:
            views.append(query['id'])

        for item in self.config['sprints']:
            name = item['name']
            print name
            result = {}

            for graph in self.view['queries']:
                sprint = item['name']
                result['sprint'] = sprint
                queryId = graph['id']

                if graph['type'] == 'date':
                    dates = [item['startAt'], item['endAt']]
                    query = 'project=' + self.config['project'] + ' AND ' + self.config['queries'][queryId] + ' and created >= "' + dates[0] + '" and created <= "' + dates[1] + '"'
                
                elif graph['type'] == 'key':
                    query = 'project=' + self.config['project'] + ' AND ' + self.config['queries'][queryId] + ' and fixVersion = "' + item['jiraKey'] + '"'
                
                print query
                data = self.apiCall(query, self.auth)
                result[queryId] = data['total']
                

            results.append(result)

        view['data'] = results
        view['views'] = views
        print view
        return view
