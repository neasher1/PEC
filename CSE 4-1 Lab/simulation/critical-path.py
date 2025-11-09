class Activity:
    def __init__(self, name, start, end, duration):
        self.name = name
        self.start = start
        self.end = end
        self.duration = duration
        self.early_start = 0
        self.early_finish = 0
        self.late_start = 0
        self.late_finish = 0
        self.slack = 0

def find_critical_path(activities):
    nodes = set()
    for activity in activities:
        nodes.add(activity.start)
        nodes.add(activity.end)
    
    max_node = max(nodes)
    early_times = {node: 0 for node in nodes}
    
    for activity in activities:
        activity.early_start = early_times[activity.start]
        activity.early_finish = activity.early_start + activity.duration
        if activity.early_finish > early_times[activity.end]:
            early_times[activity.end] = activity.early_finish
    
    project_duration = early_times[max_node]
    
    late_times = {node: project_duration for node in nodes}
    
    for activity in reversed(activities):
        activity.late_finish = late_times[activity.end]
        activity.late_start = activity.late_finish - activity.duration
        if activity.late_start < late_times[activity.start]:
            late_times[activity.start] = activity.late_start
    
    for activity in activities:
        activity.slack = activity.late_start - activity.early_start
    
    critical_path = []
    for activity in activities:
        if activity.slack == 0:
            critical_path.append(activity.name)
    
    return critical_path, project_duration

activities = [
    Activity("A - Build Frame", 1, 2, 8),
    Activity("B - Build Wheels", 1, 3, 6),
    Activity("C - Build Handlebars", 1, 4, 2),
    Activity("D - Paint Frame", 2, 5, 2),
    Activity("E - Paint Wheels", 3, 5, 1),
    Activity("F - Paint Handlebars", 4, 5, 1),
    Activity("G - Attach Wheels", 5, 6, 2),
    Activity("H - Attach Handlebars", 6, 7, 1),
    Activity("I - Quality Testing", 7, 8, 3)
]

critical_path, total_duration = find_critical_path(activities)

print("Critical Path:", " → ".join(critical_path))
print("Total Project Duration:", total_duration, "hours")