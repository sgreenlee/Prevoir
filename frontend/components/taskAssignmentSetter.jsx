var React = require("react");
var TeamMemberStore = require("../stores/teamMemberStore");
var MemberListItem = require("./memberListItem");
var TaskActions = require("../actions/taskActions");

var TaskAssignmentSetter = React.createClass({

  getInitialState: function() {
    var assigneeId = this.props.task.assignee_id || undefined;
    var assignee = assigneeId && TeamMemberStore.find(assigneeId);
    return {assignee: assignee, expanded: false, members: []};
  },

  componentDidMount: function () {
    this.memberListener = TeamMemberStore.addListener(this.memberUpdate);
    window.addEventListener("click", this.pageClick);
  },

  componentWillUnmount: function () {
    this.memberListener.remove();
    window.removeEventListener("click", this.pageClick);
  },

  memberUpdate: function () {
    var assigneeId = this.props.task.assignee_id || undefined;
    var assignee = assigneeId && TeamMemberStore.find(assigneeId);
    this.setState({ assignee: assignee });
  },

  componentWillReceiveProps: function (props) {
    var assigneeId = props.task.assignee_id || undefined;
    var assignee = assigneeId && TeamMemberStore.find(assigneeId);
    this.setState({assignee: assignee});
  },

  getNode: function(domNode) {
    this.domNode = domNode;
  },

  getUnassignNode: function (node) {
    this.unassignNode = node;
  },

  pageClick: function (e) {
    if (this.domNode.contains(e.target) && e.target !== this.unassignNode) {
      this.setState({expanded: true});
    } else {
      this.setState({expanded: false});
    }
  },

  unassign: function () {
    var task = Object.assign({}, this.props.task);
    task.assignee_id = null;
    TaskActions.updateTask(task);
  },

  onInput: function (e) {
    this.setState({ members: TeamMemberStore.search(e.target.value) });
  },

  setAssignee: function (memberId) {
    this.setState({expanded: false});
    var assignee = TeamMemberStore.find(memberId);
    var task = Object.assign({}, this.props.task);
    task.assignee_id = assignee.id;
    TaskActions.updateTask(task);
  },


  render: function() {
    var comp = this;
    var assignee = this.state.assignee;
    var name = "Unassigned";
    var className = this.state.expanded ? " expanded" : "";
    if (assignee) {
      name = assignee.first_name + " " + assignee.last_name;
      className = className + " assigned";
    }

    var avatar = assignee ? <img className="avatar" src={assignee.avatar_url} />
      : <div className="avatar" />;

    var content;
    if (this.state.expanded) {
      content = (
        <div className={"assignment-setter" + className} ref={this.getNode}>
          <div className="container">
            {avatar}
            <input onChange={this.onInput} placeholder="Enter name or email" />
          </div>
          <ul className="search-results">
              {this.state.members.map(function(member) {
                return <MemberListItem key={member.id} member={member}
                    clickHandler={comp.setAssignee.bind(comp, member.id)} />;
              })}
          </ul>
        </div>
      );
    } else {
      content = (
        <div className={"assignment-setter" + className} ref={this.getNode}>
          { avatar }
          <h6>{name}</h6>
          <input onChange={this.onInput} placeholder="Enter name or email" />
          <div className="unassign-button" ref={this.getUnassignNode} onClick={this.unassign}>
            <div className="tooltip" content="Unassign" />
          </div>
        </div>
      );

    }
    return content;
  }

});

module.exports = TaskAssignmentSetter;
