const getTopNotifications = (
  notifications,
  limit
) => {
  const weightMap = {
    Placement: 100,
    Result: 80,
    Event: 60,
  };

  return notifications
    .map((n) => {
      const age =
        (Date.now() -
          new Date(n.Timestamp).getTime()) /
        1000;

      const score =
        weightMap[n.Type] - age / 1000;

      return {
        ...n,
        score,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

module.exports = getTopNotifications;