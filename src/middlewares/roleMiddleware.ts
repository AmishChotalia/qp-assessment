export const roleMiddleware = (role: "admin" | "user") => {
  return (req: any, res: any, next: any) => {
    if (req.user.role !== role) {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient permissions" });
    }
    next();
  };
};
