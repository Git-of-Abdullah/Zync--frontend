import React, { useEffect, useState } from "react";
import { useChat } from "../ChatProvider/ChatProvider";
import "./UserList.css";

const UserList = ({ startChat }) => {
  const { chatClient } = useChat();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!chatClient || !chatClient.user) return;

      setCurrentUser(chatClient.user);
      setLoading(true);
      setError(null);

      try {
        const response = await chatClient.queryUsers(
          {
            id: { $ne: chatClient.user.id }, // Exclude the current user
            role: { $ne: "admin" }, // Exclude admin users
          },
          { id: 1 },
          {}
        );

        console.log("Fetched Users:", response.users);
        setUsers(response.users);
        setFilteredUsers(response.users); // Initialize filtered list
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    // Auto-refresh user list when a new user joins
    const userListener = chatClient.on((event) => {
      if (event.type === "user.presence.changed" || event.type === "user.updated") {
        fetchUsers();
      }
    });

    return () => userListener.unsubscribe();
  }, [chatClient]);

  // Handle search input change
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredUsers(
      users.filter((user) => user.name.toLowerCase().includes(value))
    );
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="user-list-container">
      <input
        type="text"
        placeholder="Search users..."
        className="search-bar"
        value={searchTerm}
        onChange={handleSearch}
      />

      <div className="user-list">
        {filteredUsers.length === 0 ? (
          <p>No users found.</p>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="user-item"
              onClick={() => startChat(user.id)}
            >
              <img
                src={user.image || "/default-avatar.png"}
                alt={user.name}
                className="user-avatar"
              />
              <span>{user.name || "Unknown User"}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserList;
