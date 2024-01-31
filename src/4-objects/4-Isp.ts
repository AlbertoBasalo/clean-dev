// ❌
class Activities {
  addNew() {}
  remove() {}
  cancel() {}
  confirm() {}
  enrollParticipant() {}
  removeParticipant() {}
  finish() {}
}

class App {
  main() {
    const activities: Activities = new Activities();
    this.createActivity(activities);
    this.enrollParticipant(activities);
    this.markActivityAsFinished(activities);
  }
  createActivity(activities: Activities) {
    activities.addNew();
  }
  enrollParticipant(activities: Activities) {
    activities.enrollParticipant();
  }
  markActivityAsFinished(activities: Activities) {
    activities.finish();
  }
}

// ✅

interface ActivitiesRepository {
  addNew(): void;
  remove(): void;
}

interface ActivitiesManagement {
  cancel(): void;
  confirm(): void;
  finish(): void;
}

interface ActivitiesParticipation {
  enrollParticipant(): void;
  removeParticipant(): void;
}

class Activities_I implements ActivitiesRepository, ActivitiesManagement, ActivitiesParticipation {
  addNew() {}
  remove() {}
  cancel() {}
  confirm() {}
  enrollParticipant() {}
  removeParticipant() {}
  finish() {}
}

class AppI {
  main() {
    const activities: Activities = new Activities_I();
    this.createActivity(activities);
    this.enrollParticipant(activities);
    this.markActivityAsFinished(activities);
  }
  createActivity(activities: ActivitiesRepository) {
    activities.addNew();
  }
  enrollParticipant(activities: ActivitiesParticipation) {
    activities.enrollParticipant();
  }
  markActivityAsFinished(activities: ActivitiesManagement) {
    activities.finish();
  }
}
