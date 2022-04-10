class Api {

    constructor(restClient) {
        this._restClient = restClient;
    }

    /**
     * 1. Загрузка информации о пользователе с сервера
     * GET https://nomoreparties.co/v1/{cohortId}/users/me
     */
    getUserInfo() {
        return this._restClient.read("users/me");
    }

    /**
     * 2. Загрузка карточек с сервера
     * GET https://mesto.nomoreparties.co/v1/{cohortId}/cards
     */
    getCards() {
        return this._restClient.read("cards");
    }

    /**
     * 3. Редактирование профиля
     * PATCH https://mesto.nomoreparties.co/v1/{cohortId}/users/me
     */
    updateUserInfo({ name, about }) {
        return this._restClient.updatePartially("users/me", { name, about });
    }

    /**
     * 4. Добавление новой карточки
     * POST https://mesto.nomoreparties.co/v1/{cohortId}/cards
     */
    createCard({ name, link }) {
        return this._restClient.create("cards", { name, link });
    }

    /**
     * 7. Удаление карточки
     * DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/cardId
     */
    deleteCard(cardId) {
        return this._restClient.delete(`cards/${cardId}`);
    }

    /**
     * 8. Постановка и снятие лайка
     * PUT https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes
     * DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes
     */
    setLike(isLiked) {
        return Promise.reject("ERROR: Not implemented!");
    }

    /**
     * 9. Обновление аватара пользователя
     * PATCH https://mesto.nomoreparties.co/v1/cohortId/users/me/avatar
     */
    updateUserAvatar(avatarUrl) {
        return Promise.reject("ERROR: Not implemented!");
    }
}

export { Api };