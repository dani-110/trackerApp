import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ticketOutboxEvents } from "../../store/actions/tickets";

const OutboxEvent = ({ data, onData, reloadKey }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    let active = true;
    onData({ loading: true, error: false, items: [] });
    dispatch(ticketOutboxEvents(data?.workItemId)).then((result) => {
      if (!active) return;
      const error = result.meta.requestStatus !== "fulfilled";
      const records =
        error || !Array.isArray(result.payload?.data?.items)
          ? []
          : result.payload.data.items;
      const items = records.map((record) => ({
        id: record.outboxEventId,
        title: String(record.eventType || "Outbox event").replaceAll("_", " "),
        time: record.occurredAt,
        actor: "Integration Platform",
        status: record.status,
        statusLabel: String(record.status || "Unknown").replaceAll("_", " "),
        summary: record.aggregateType,
        fields: [
          ["Aggregate type", record.aggregateType],
          ["Event type", record.eventType],
          ["Attempts", record.attemptCount],
          ["Channel", record.channel],
          ["Correlation ID", record.correlationId],
          ["Communication", record.communicationId],
          ["Communication type", record.communicationType],
          ["Event version", record.eventVersion],
          ["Next attempt", record.nextAttemptAt],
          ["Last error", record.lastError],
          ["Processed at", record.processedAt],
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
export default OutboxEvent;
