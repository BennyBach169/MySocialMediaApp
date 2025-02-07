import { useNavigate } from "react-router-dom";
import { authStore, logOut } from "./redux/AuthStore";
import authService from "./services/AuthService";

export function timeAgo(date: string | Date): string {
    const now = new Date();
    const past = typeof date === "string" ? new Date(date) : date;
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    const timeIntervals = {
        year: 365 * 24 * 60 * 60,
        month: 30 * 24 * 60 * 60,
        day: 24 * 60 * 60,
        hour: 60 * 60,
        minute: 60,
    };

    if (diffInSeconds < timeIntervals.minute) {
        return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < timeIntervals.hour) {
        const minutes = Math.floor(diffInSeconds / timeIntervals.minute);
        return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < timeIntervals.day) {
        const hours = Math.floor(diffInSeconds / timeIntervals.hour);
        return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < timeIntervals.month) {
        const days = Math.floor(diffInSeconds / timeIntervals.day);
        return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < timeIntervals.year) {
        const months = Math.floor(diffInSeconds / timeIntervals.month);
        return `${months} month${months > 1 ? "s" : ""} ago`;
    } else {
        const years = Math.floor(diffInSeconds / timeIntervals.year);
        return `${years} year${years > 1 ? "s" : ""} ago`;
    }
}


export function getToeknState(){
    return authStore.getState().token;
}

