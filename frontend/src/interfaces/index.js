class UserData {
    constructor(uid, registeredCourses) {
        this.uid = uid || '';
        this.registeredCourses = registeredCourses || [];
    }
    toDoc() {
        return {
            uid: this.uid,
            registeredCourses: this.registeredCourses,
        };
    }
}

class Course {
    constructor(id, code, name, prof, ltp, venue, slots, details) {
        this.id = id || '';
        this.code = code || '';
        this.name = name || '';
        this.prof = prof || '';
        this.ltp = ltp || '';
        this.venue = venue || '';
        this.details = details || '';
    }

    toDoc() {
        return {
            id: this.id,
            code: this.code,
            name: this.name,
            prof: this.prof,
            ltp: this.ltp,
            venue: this.venue,
            details: this.details,
        };
    }
}

class Slot {
    constructor(id, courseCode, day, start, end, type, venue, group, faculty) {
        this.id = id || '';
        this.courseCode = courseCode || '';
        this.day = day || '';
        this.start = start || '';
        this.end = end || '';
        this.type = type || '';
        this.venue = venue || '';
        this.group = group || '';
        this.faculty = faculty || '';
    }

    toDoc() {
        return {
            id: this.id,
            courseCode: this.courseCode,
            day: this.day,
            start: this.start,
            end: this.end,
            type: this.type,
            venue: this.venue,
            group: this.group,
            faculty: this.faculty,
        };
    }
}

export { Course, Slot, UserData };
