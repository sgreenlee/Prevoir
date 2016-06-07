var AppDispatcher = require("../dispatcher/dispatcher");
var SessionConstants = require("../constants/sessionConstants");
var TeamConstants = require("../constants/teamConstants");
var TaskConstants = require("../constants/taskConstants");
var ProjectConstants = require("../constants/projectConstants");
var TeamMemberConstants = require("../constants/teamMemberConstants");
var CommentConstants = require("../constants/commentConstants");
var CommentStore = require("../stores/commentStore");

var ServerActions = {

  logout: function () {
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGOUT
    });
  },

  receiveCurrentUser: function (user) {
    if (!user.id) user = null;
    AppDispatcher.dispatch({
      actionType: SessionConstants.RECEIVE_CURRENT_USER,
      user: user
    });
  },

  receiveUserErrors: function(errors) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.ERROR,
      errors: errors
    });
  },

  receiveTeam: function (team) {
    AppDispatcher.dispatch({
      actionType: TeamConstants.RECEIVE_TEAM,
      team: team
    });
  },

  receiveAllTeams: function (teams) {
    AppDispatcher.dispatch({
      actionType: TeamConstants.RECEIVE_ALL_TEAMS,
      teams: teams
    });
  },

  receiveAllTasks: function (team) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.RECEIVE_ALL_TASKS,
      teamId: team.id,
      tasks: team.tasks
    });
  },

  receiveTask: function (task) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.RECEIVE_TASK,
      task: task
    });
  },

  receiveTaskErrors: function (errors) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.ERROR,
      errors: errors
    });
  },

  removeTask: function (task) {
    AppDispatcher.dispatch({
      actionType: TaskConstants.REMOVE_TASK,
      task: task
    });
  },

  receiveTeamMembers: function (team) {
    AppDispatcher.dispatch({
      actionType: TeamMemberConstants.RECEIVE_ALL_MEMBERS,
      id: team.id,
      members: team.members
    });
  },

  receiveTeamMember: function (team) {
    AppDispatcher.dispatch({
      actionType: TeamMemberConstants.RECEIVE_MEMBER,
      id: team.id,
      member: team.member
    });
  },

  receiveProject: function (project) {
    AppDispatcher.dispatch({
      actionType: ProjectConstants.RECEIVE_PROJECT,
      project: project
    });
  },

  receiveAllProjects: function (team) {
    AppDispatcher.dispatch({
      actionType: ProjectConstants.RECEIVE_ALL_PROJECTS,
      teamId: team.id,
      projects: team.projects
    });
  },

  receiveComment: function (comment) {
    AppDispatcher.dispatch({
      actionType: CommentConstants.RECEIVE_COMMENT,
      comment: comment
    });
  },

  receiveAllComments: function (comments) {
    AppDispatcher.dispatch({
      actionType: CommentConstants.RECEIVE_ALL_COMMENTS,
      comments: comments
    });
  },

  removeComment: function (comment) {
    AppDispatcher.dispatch({
      actionType: CommentConstants.REMOVE_COMMENT,
      comment: comment
    });
  }

};

module.exports = ServerActions;
