export const branches = [
  "Angul", "Bargarh", "Bhadrak", "Balasore", "Balangir", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", 
  "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", 
  "Kendrapara", "Keonjhar", "Khurda", "Koraput", "Malkangiri", "Mayurbhanj", "Nuapada", 
  "Nabarangpur", "Nayagarh", "Puri", "Rayagada", "Sambalpur", "Sonepur", "Sundargarh", "Bhubaneswar"
];

export const getBranchCredential = (branchName: string) => {
  return `oica${branchName.toLowerCase()}26`;
};

export const isValidBranchCredential = (username: string) => {
  const normalizedUsername = username.toLowerCase();
  return branches.some(branch => getBranchCredential(branch) === normalizedUsername);
};
