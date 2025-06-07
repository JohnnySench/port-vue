import { onMounted, shallowRef } from "vue"

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export const useFetchUsersPagination = () => {
  const users = shallowRef<User[]>([]);
  const isLoading = shallowRef(false)

  const fetchUsers = async (skip = 0) => {
    isLoading.value = true
    try {
      const response = await fetch(`https://dummyjson.com/users?limit=5&skip=${skip}`)
      users.value = (await response.json()).users;
      console.log(users.value);
    } catch (e) {
      throw e;
    } finally {
      isLoading.value = false
    }
  }

  onMounted(async () => {
    await fetchUsers()
  })

  return {
    users,
    isLoading,
    fetchUsers,
  }
}
