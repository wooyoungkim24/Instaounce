import './FollowingModal.css';


const FollowingModal = ({ props }) => {
    const { followers, following, isUserFollowing, user} = props
    return (
        <div>
            {following.map(follow => (
                <div>
                    {follow.username}
                </div>
            ))}
        </div>
    );
};

export default FollowingModal;