#ifndef PLONK_FIELD_HPP
#define PLONK_FIELD_HPP

#include "../../../fields/fr.hpp"
#include "../common.hpp"

#include "../bool/bool.hpp"

namespace plonk
{
namespace stdlib
{

template <typename ComposerContext>
class field_t
{
public:
    field_t();
    field_t(ComposerContext *parent_context);
    field_t(ComposerContext *parent_context, const barretenberg::fr::field_t &value);
    field_t(const witness_t<ComposerContext> &value);
    field_t(const field_t &other);
    field_t(field_t &&other);
    ~field_t();

    field_t(const bool_t<ComposerContext> &other);
    operator bool_t<ComposerContext> ();

    field_t& operator=(const field_t &other);
    field_t& operator=(field_t &&other);

    field_t& operator=(const barretenberg::fr::field_t &value);
    field_t& operator=(const uint64_t value);

    // field_t& operator=(const barretenberg::fr::field_t &value);

    field_t operator+(const field_t &other);
    field_t operator-(const field_t &other);
    field_t operator*(const field_t &other);
    field_t operator/(const field_t &other);
    // field_t operator==(const field_t &other);

    field_t normalize();

    barretenberg::fr::field_t get(); // for debug atm

    ComposerContext *context;
    barretenberg::fr::field_t additive_constant;
    barretenberg::fr::field_t multiplicative_constant;
    barretenberg::fr::field_t witness;
    uint32_t witness_index = static_cast<uint32_t>(-1);    
    // field_t operator+(const barretenberg::fr::field_t &other);    
};
}
}

#include "./field.tcc"
#endif