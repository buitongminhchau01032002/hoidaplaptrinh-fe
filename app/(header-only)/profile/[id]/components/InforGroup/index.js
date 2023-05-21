import Birthday from './Birthday';
import FirstName from './FirstName';
import LastName from './LastName';
import Password from './Password';

function InforGroup({ user, currentUser, onChange, isOwner }) {
    return (
        <div>
            <FirstName
                user={user}
                currentUser={currentUser}
                onChange={onChange}
                isOwner={isOwner}
            />
            <LastName user={user} currentUser={currentUser} onChange={onChange} isOwner={isOwner} />
            <Birthday user={user} currentUser={currentUser} onChange={onChange} isOwner={isOwner} />
            {isOwner && (
                <Password
                    user={user}
                    currentUser={currentUser}
                    onChange={onChange}
                    isOwner={isOwner}
                />
            )}
        </div>
    );
}

export default InforGroup;
