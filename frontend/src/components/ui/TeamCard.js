import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';

const TeamCard = ({ member }) => {
  const roleColors = {
    founder: 'from-yellow-500 to-orange-500',
    'co-founder': 'from-yellow-500 to-orange-500',
    director: 'from-primary-500 to-primary-700',
    management: 'from-blue-500 to-blue-700',
    trainer: 'from-green-500 to-emerald-600',
    support: 'from-gray-500 to-gray-700',
  };

  return (
    <div className="card card-hover overflow-hidden group">
      {/* Photo/Avatar */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <div className={`w-24 h-24 bg-gradient-to-br ${roleColors[member.role] || 'from-primary-500 to-primary-700'} rounded-full flex items-center justify-center text-white text-3xl font-bold`}>
          {member.name?.split(' ').map(n => n[0]).join('')}
        </div>
        
        {/* Role Badge */}
        <span className={`absolute top-4 right-4 badge ${
          member.role === 'founder' || member.role === 'co-founder' 
            ? 'bg-yellow-100 text-yellow-800' 
            : 'badge-purple'
        } capitalize`}>
          {member.role?.replace('-', ' ')}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
        <p className="text-primary-600 font-medium text-sm mb-3">{member.designation}</p>
        
        {member.bio && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{member.bio}</p>
        )}

        {/* Expertise Tags */}
        {member.expertise && member.expertise.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {member.expertise.slice(0, 3).map((skill, idx) => (
              <span key={idx} className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded">
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Experience */}
        {member.experience && (
          <p className="text-sm text-gray-500 mb-4">
            <span className="font-medium">Experience:</span> {member.experience}
          </p>
        )}

        {/* Social Links */}
        {member.socialLinks && (
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            {member.socialLinks.linkedin && (
              <a 
                href={member.socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <FaLinkedin size={18} />
              </a>
            )}
            {member.socialLinks.twitter && (
              <a 
                href={member.socialLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <FaTwitter size={18} />
              </a>
            )}
            {member.socialLinks.github && (
              <a 
                href={member.socialLinks.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-900 transition-colors"
              >
                <FaGithub size={18} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamCard;
