import React, { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { Button, Box, FormControl, InputLabel, Select, MenuItem, OutlinedInput, Chip } from '@mui/material';

export default function AddServerForm({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    ip: '',
    location:'',
    description: '',
    tags: [],
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const tagOptions = ['VM', 'Database', 'Web Server', 'Application', 'Storage', 'Proxy', 'Container', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagsChange = (e) => {
    const {
      target: { value },
    } = e;
    setFormData((prev) => ({
      ...prev,
      tags: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('');

    // Example: Send to backend or simulate success
    setTimeout(() => {
      setStatusMessage('✅ Server added successfully!');
      onAdd({
        name: formData.name,
        status: 'connected',
        disconnectTime: null,
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4 text-[#0058a1]">Add New Server</h2>

      <input
        type="text"
        name="name"
        placeholder="Server Name"
        value={formData.name}
        onChange={handleChange}
        className="input-field"
        required
      />
      <br />

      <input
        type="text"
        name="ip"
        placeholder="IP Address"
        value={formData.ip}
        onChange={handleChange}
        className="input-field"
        required
      />
      <br />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="input-field"
        required
      />
      <br />
      <textarea
        name="description"
        placeholder="Description (optional)"
        value={formData.description}
        onChange={handleChange}
        className="input-field"
        rows={3}
      />
      <br />

      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel>Tags</InputLabel>
          <Select
            multiple
            value={formData.tags}
            onChange={handleTagsChange}
            input={<OutlinedInput label="Tags" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {tagOptions.map((tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <br />

      {statusMessage && (
        <p className="text-sm text-center" style={{ color: statusMessage.startsWith('✅') ? 'green' : 'red' }}>
          {statusMessage}
        </p>
      )}

      <div className="flex justify-end w-full mt-4">
        <Button
          type="submit"
          size="small"
          color="primary"
          variant="contained"
          startIcon={<SaveIcon />}
          sx={{
            backgroundColor: '#0058a1',
            '&:hover': { backgroundColor: '#004a8a' },
            color: 'white',
          }}
        >
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
}
