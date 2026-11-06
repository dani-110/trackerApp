import { useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import {ticketAssignmentHistory} from "../../store/actions/tickets";

const AssignmentHistory = ({ data, onData, reloadKey }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    let active = true;
    onData({ loading: true, error: false, items: [] });
    dispatch(ticketAssignmentHistory(data?.workItemId))
      .then((result) => {
        if (!active) return;
        const error = result.meta.requestStatus !== "fulfilled";
        const records =
          error || !Array.isArray(result.payload?.data?.items)
            ? []
            : [...result.payload.data.items].sort(
                (a, b) =>
                  moment(b.assignedAt).valueOf() -
                  moment(a.assignedAt).valueOf(),
              );
        const items = records.map((record) => {
          const isTeam = String(record.assignmentType).toUpperCase() === "TEAM";
          const isUser = String(record.assignmentType).toUpperCase() === "USER";
          return {
            title: `Assigned to ${record.targetName || record.targetCode || "Unknown"}`,
            time: record.assignedAt,
            actor: record.assignedByDisplayName,
            statusLabel: record.isActive ? "Current" : "Superseded",
            summary: record.assignmentComment,
            fields: [
              ["Assignment type", record.assignmentType],
              ["Assigned team", isTeam ? record.targetName : null],
              ["Assigned user", isUser ? record.targetName : null],
              ["Previous team", record.previousTeamName || "-"],
              ["Previous user", record.previousUserName || "-"],
              ["Reason code", record.assignmentReasonCode],
              ["Assigned by", record.assignedByDisplayName],
              ["Comment", record.assignmentComment],
              ["Ended at", record.endedAt],
            ],
          };
        });
        onData({ loading: false, error, items });
      })
      .catch(() => {
        if (!active) return;
        onData({ loading: false, error: true, items: [] });
      });
    return () => {
      active = false;
    };
  }, [data?.workItemId, dispatch, onData, reloadKey]);
  return null;
};
export default AssignmentHistory;
