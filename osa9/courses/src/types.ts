export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CoursePartWithRequirements;

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartWithDescription {
  type: 'normal';
}

interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartWithDescription {
  type: 'submission';
  exerciseSubmissionLink: string;
}

interface CoursePartWithRequirements extends CoursePartWithDescription {
  type: 'special';
  requirements: string[];
}