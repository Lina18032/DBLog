import React from 'react';

const InfoCard = ({ icon, title, value, background = '#EEF7FF' }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '250px',
        height: '100px',
        borderRadius: '12px',
        backgroundColor: background,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
      }}
    >
      {/* Icon Section (1/3) */}
      <div
        style={{
          width: '33%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ fontSize: '32px' }}>{icon}</div>
      </div>

      {/* Text Section (2/3) */}
      <div
        style={{
          width: '67%',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
          {title}
        </div>
        <div style={{ fontSize: '12px', fontWeight: '600', marginTop: '4px', color: '#000' }}>
          {value}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
