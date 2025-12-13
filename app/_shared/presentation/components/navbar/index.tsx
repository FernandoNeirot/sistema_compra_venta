'use client'
import { useState, useEffect } from 'react'
import { Box, IconButton, TextField, useTheme } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import PersonIcon from '@mui/icons-material/Person';
import Image from 'next/image';
const Navbar = () => {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setSearchValue(searchParams.get('buscar') || '');
  }, [searchParams]);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.secondary.dark,
        height: 64,
        boxShadow: theme.shadows[14],
        px: 2
      }}
    >
      <div className='max-w-[1200px] flex w-full justify-between items-center py-2'>
        <Link href="/">
          <Image
            src="/images/logo.webp"
            alt="Logo"
            width={80}
            height={40}
            priority
            style={{ cursor: 'pointer', width: 80, height: 40 }}
          />
        </Link>
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            color="primary"
            placeholder='Buscar'
            variant="outlined"
            size="small"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              const params = new URLSearchParams(searchParams.toString());
              if (e.target.value) {
                params.set('buscar', e.target.value);
              } else {
                params.delete('buscar');
              }
              const queryString = params.toString();
              router.push(queryString ? `?${queryString}` : window.location.pathname, { scroll: false });
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <SearchIcon sx={{ color: theme.palette.text.secondary, marginRight: 1 }} />
                ),
              },
            }}
            sx={{
              marginLeft: 2,
              backgroundColor: theme.palette.background.paper,
              width: '100%',
              maxWidth: 600,
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.divider,
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.divider,
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.divider,
                },
              },
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton color="primary" href="/perfil">
            <PersonIcon sx={{ color: theme.palette.text.primary }} />
          </IconButton>
        </Box>
      </div>
    </Box>
  )
}

export default Navbar