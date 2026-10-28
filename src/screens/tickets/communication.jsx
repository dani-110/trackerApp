import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ticketAcknowledgementHistory } from "../../store/actions/tickets";

const Communication = ({ data, onData, reloadKey }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    let active = true;
    onData({ loading: true, error: false, items: [] });
    dispatch(ticketAcknowledgementHistory(data?.workItemId)).then((result) => {
      if (!active) return;
      const error = result.meta.requestStatus !== "fulfilled";
      const records =
        error || !Array.isArray(result.payload?.data?.items)
          ? []
          : result.payload.data.items;
      const items = records.map((record) => ({
        id: record.acknowledgementId,
        title: String(record.communicationType || "Acknowledgement").replaceAll(
          "_",
          " ",
        ),
        time: record.generatedAt,
        actor: record.generatedByDisplayName,
        status: record.status,
        statusLabel: String(record.status || "Unknown").replaceAll("_", " "),
        summary: record.subject,
        fields: [
          ["Channel", record.channel],
          ["Recipient", record.toAddress],
          ["CC", record.ccAddresses],
          ["Subject", record.subject],
          ["Approved by", record.approvedByDisplayName],
          ["Approved at", record.approvedAt],
          ["Queued at", record.queuedAt],
          ["Sent at", record.sentAt],
          ["Failed at", record.failedAt],
          ["Failure reason", record.failureReason],
          ["Message", record.body],
        ],
      }));
      onData({
        loading: false,
        error,
        items,
      });
    });
    return () => {
      active = false;
    };
  }, [data?.workItemId, dispatch, onData, reloadKey]);
  return null;
};
export default Communication;
