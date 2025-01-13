import { createRouter, createWebHistory } from 'vue-router'
import MapView from '@/views/main/MapView.vue'
import MypageView from '@/views/main/MypageView.vue'
import MainLayout from '@/components/layouts/MainLayout.vue'
import HouseInfoList from '@/components/houseinfo/HouseInfoList.vue'
import BoardLayout from '@/components/layouts/BoardLayout.vue'
import BoardNoticeList from '@/views/main/board/BoardNoticeList.vue'
import BoardQnaList from '@/views/main/board/BoardQnaList.vue'
import BoardQnaForm from '@/views/main/board/BoardQnaForm.vue'
import CatView from '@/views/main/CatView.vue'
import BoardNoticeForm from '@/views/main/board/BoardNoticeForm.vue'
import { useUserStore } from '@/store/user'
import { useModalStore } from '@/store/modal'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: MainLayout,
      redirect: { name: 'main' },
      children: [
        {
          path: 'index',
          name: 'main',
          component: MapView,
          redirect: { name: 'house-info-list' },
          children: [
            {
              path: 'house-info-list',
              name: 'house-info-list',
              component: HouseInfoList,
            },
            {
              path: 'house-info-detail/:houseId',
              name: 'house-info-detail',
              components: {
                default: () => import('@/components/houseinfo/HouseInfoDetail.vue'),
                second: () => import('@/components/housedeal/HouseDealList.vue'),
              },
            },
            {
              path: 'house-info-detail/:houseId/house-deal-detail/:dealId',
              name: 'house-deal-detail',
              components: {
                default: () => import('@/components/houseinfo/HouseInfoDetail.vue'),
                second: () => import('@/components/housedeal/HouseDealDetail.vue'),
              },
            },
            {
              path: 'house-info-detail/:houseId/article',
              name: 'house-article',
              components: {
                default: () => import('@/components/houseinfo/HouseInfoDetail.vue'),
                second: () => import('@/components/housearticle/HouseArticleLayout.vue'),
              },
              redirect: { name: 'house-article-list' },
              children: [
                {
                  path: '',
                  name: 'house-article-list',
                  components: {
                    third: () => import('@/components/housearticle/HouseArticleList.vue'),
                  },
                },
                {
                  path: ':articleId',
                  name: 'house-article-detail',
                  components: {
                    third: () =>
                      import('@/components/housearticle/HouseArticleDetail.vue'),
                  },
                },
              ],
            },
            // {
            //   path: 'house-info-detail/:houseId/article',
            //   name: 'house-article-list',
            //   components: {
            //     default: () => import('@/components/houseinfo/HouseInfoDetail.vue'),
            //     second: () => import('@/components/housearticle/HouseArticleList.vue'),
            //   },
            // },
            // {
            //   path: 'house-info-detail/:houseId/article/:articleId',
            //   name: 'house-article-detail',
            //   components: {
            //     default: () => import('@/components/houseinfo/HouseInfoDetail.vue'),
            //     second: () => import('@/components/housearticle/HouseArticleDetail.vue'),
            //   },
            // },
            {
              path: 'house-info-detail/:houseId/article/form',
              name: 'house-article-form',
              meta: { requiresAuth: true },
              components: {
                default: () => import('@/components/houseinfo/HouseInfoDetail.vue'),
                second: () => import('@/components/housearticle/HouseArticleForm.vue'),
              },
            },
          ],
        },
        {
          path: 'house-deal-regist',
          name: 'house-deal-regist',
          meta: { requiresAuth: true },
          component: () => import('@/views/main/HouseDealRegist.vue'),
        },
        {
          path: 'board',
          name: 'board',
          component: BoardLayout,
          redirect: { name: 'notice' },
          children: [
            {
              path: 'notice',
              name: 'notice',
              component: BoardNoticeList,
            },
            {
              path: 'notice/:articleId',
              name: 'notice-detail',
              component: () => import('../views/main/board/BoardNoticeDetail.vue'),
            },
            {
              path: 'notice/form/:type',
              name: 'notice-form',
              meta: { requiresAuth: true },
              component: BoardNoticeForm,
            },
            {
              path: 'qna',
              name: 'qna',
              component: BoardQnaList,
            },
            {
              path: 'qna/:articleId',
              name: 'qna-detail',
              component: () => import('../views/main/board/BoardQnaDetail.vue'),
            },
            {
              path: 'qna/form/:type',
              name: 'qna-form',
              meta: { requiresAuth: true },
              component: BoardQnaForm,
            },
          ],
        },
        {
          path: 'mypage',
          name: 'mypage',
          meta: { requiresAuth: true },
          component: MypageView,
        },
        {
          path: 'cat-view',
          name: 'cat-view',
          component: CatView,
        },
        {
          path: 'admin',
          name: 'admin',
          meta: { requiresAuth: true },
          component: () => import('@/components/layouts/AdminLayout.vue'),
          redirect: { name: 'admin-user' },
          children: [
            {
              path: 'user',
              name: 'admin-user',
              component: () => import('@/views/main/admin/AdminUser.vue'),
            },
            {
              path: 'house-info',
              name: 'admin-house-info',
              component: () => import('@/views/main/admin/AdminHouseInfo.vue'),
            },
            {
              path: 'house-deal',
              name: 'admin-house-deal',
              component: () => import('@/views/main/admin/AdminHouseDeal.vue'),
            },
          ],
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const { closeAuthModal, closeFavoriteModal } = useModalStore()
  closeAuthModal()
  closeFavoriteModal()

  const isLogin = useUserStore().isLogin
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isLogin) {
      next({ name: 'index' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
