import React from 'react';
import HistoryLine from '../../../components/historyLine/historyline';
import http from '../../../services/http';
import * as config from '../../../config/config.json';
import './dashboard.css';
import { toast } from 'react-toastify';

const Dashboard = ({ curUser, history, match }) => {
    const deleteUser = async () => {
        try {
            const permitted = window.confirm('Are you sure you want to delete your account?');
            if (permitted) {
                await http.delete(`${config.apiEndpoint}/user/delete-user/${match.params.id}`);
                localStorage.removeItem("user-token");
                window.location = "/";
            }
            else return;
        } catch (ex) {
            console.error(ex);
            toast.error('Could not delete user.');
        }
    };
    return (
        <React.Fragment>
            <HistoryLine active="user-dashboard" />
            <div className="dashboard-container">
                {curUser && <div className="dashboard">
                    <h1 className="dashboard-user">{curUser.name}'s Dashboard</h1>
                    <div className="dashboard-buttons">
                        <button onClick={() => history.push('/cart')} className="dashboard-button1">VIEW CART</button>
                        <button onClick={() => history.push('/logout')} className="dashboard-button2">LOGOUT</button>
                        <button onClick={deleteUser} className="dashboard-button3">DELETE ACCOUNT</button>
                    </div>
                </div>}
            </div>
        </React.Fragment>
    );
};

export default Dashboard;