import { useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import {
  ticketActivityHistory,
  ticketAssignmentHistory,
} from "../../store/actions/tickets";

const readState = (value) => {
  if (!value) return {};
  if (typeof value === "object") return value;
  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
};

const AssignmentHistory = ({ data, onData, reloadKey }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    let active = true;
    onData({ loading: true, error: false, items: [] });
    Promise.all([
      dispatch(ticketAssignmentHistory(data?.workItemId)),
      dispatch(ticketActivityHistory(data?.workItemId)),
    ]).then(([result, activityResult]) => {
      if (!active) return;
      const error = result.meta.requestStatus !== "fulfilled";
      const records =
        error || !Array.isArray(result.payload?.data?.items)
          ? []
          : [...result.payload.data.items].sort(
              (a, b) =>
                moment(b.assignedAt).valueOf() - moment(a.assignedAt).valueOf(),
            );
      const activityItems =
        activityResult.meta.requestStatus === "fulfilled" &&
        Array.isArray(activityResult.payload?.data?.items)
          ? activityResult.payload.data.items
          : [];
      const namesById = new Map(
        records
          .map((record) => [
            String(record.targetId || "").toLowerCase(),
            record.targetName || record.targetCode,
          ])
          .filter(([id]) => id),
      );
      const findName = (id) =>
        id ? namesById.get(String(id).toLowerCase()) || id : null;
      const items = records.map((record) => {
        const event = activityItems.find((activity) => {
          const after = readState(activity.afterJson);
          return (
            String(after.assignmentId || "").toLowerCase() ===
            String(record.assignmentId || "").toLowerCase()
          );
        });
        const before = readState(event?.beforeJson);
        const isTeam = String(record.assignmentType).toUpperCase() === "TEAM";
        const isUser = String(record.assignmentType).toUpperCase() === "USER";
        return {
          id: record.assignmentId,
          title: `Assigned to ${record.targetName || record.targetCode || "Unknown"}`,
          time: record.assignedAt,
          actor: record.assignedByDisplayName,
          status: record.isActive ? "CURRENT" : "SUPERSEDED",
          statusLabel: record.isActive ? "Current" : "Superseded",
          summary: record.assignmentComment,
          fields: [
            ["Assignment type", record.assignmentType],
            ["Assigned team", isTeam ? record.targetName : null],
            ["Assigned user", isUser ? record.targetName : null],
            ["Previous team", findName(before.teamId)],
            ["Previous user", findName(before.assigneeUserId)],
            ["Reason code", record.assignmentReasonCode],
            ["Assigned by", record.assignedByDisplayName],
            ["Comment", record.assignmentComment],
            ["Ended at", record.endedAt],
          ],
        };
      });
      onData({ loading: false, error, items });
    });
    return () => {
      active = false;
    };
  }, [data?.workItemId, dispatch, onData, reloadKey]);
  return null;
};
export default AssignmentHistory;
